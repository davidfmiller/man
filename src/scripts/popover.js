/* jshint undef: true,strict:true,trailing:true,loopfunc:true */
/* global document,window,Element,module */

(() => {
  'use strict';

  const

  RMR = require('rmr-util'),

  // VERSION = '0.1.9',

  // default attribute on target nodes that will be inspected for popover data
  ATTR = 'data-popover',

  // default background color for popovers
  COLOR = 'rgba(0,0,0,0.8)',

  // offset of popover from target node
  MARGIN = 0,

  /*
   * Generate a unique string suitable for id attributes
   *
   * @param basename (String)
   * @return string
   */
  guid = RMR.String.guid,

  /*
   * Merge two objects into one, values in b take precedence over values in a
   *
   * @param a {Object}
   * @param b {Object}

   * @return Object
   */
  merge = RMR.Object.merge,

  /*
   * Convert an array-like thing (ex: NodeList or arguments object) into a proper array
   *
   * @param list (array-like thing)
   * @return Array
   */
  arr = RMR.Array.coerce,

  /*
   * Create an element with a set of attributes/values
   *
   * @param type (String)
   * @param attrs {Object}
   *
   * @return HTMLElement
   */
  makeElement = RMR.Node.make,

  /*
   * Retrieve an object containing { top : xx, left : xx, bottom: xx, right: xx, width: xx, height: xx }
   *
   * @param node (DOMNode)
   */
  getRect = RMR.Node.getRect,

  /*
   * Retrieve object containing popover data for an element on the page
   *
   * @param scope {Popover}
   * @param node {
   * @return {Object}
   */
  getDataForNode = function(scope, node) {
    let val = scope.factory ? scope.factory(node) : node.getAttribute(scope.attribute);
    const data = scope.defaults;

    if (typeof val !== "object") {
      try {
        val = JSON.parse(val);

        if (typeof val === 'number') {
          val = { content: val };
        }
      } catch (err) {
        val = { content: val };
      }
    }

    return merge(data, val);
  },


  /*
   *
   * @param node {HTMLElement}
   * @param styles {Object}
   */
  setStyles = RMR.Node.setStyles,

  /*
   * Position a popover relative to its target parent
   *
   * @param popover {HTMLElement} - the popover element
   * @param target {HTMLElement} - the reference element for the popover
   * @param data {Object} - object containing data for the popover
   */
  positionPopover = function(popover, target, data) {
    const
    targetRect = getRect(target),
    popoverRect = getRect(popover),
    arrow = popover.querySelector('.arrow');

    let
    popoverXY = null,
    arrowXY = null;

    // set default location for popover
    popoverXY = [
      targetRect.left + (targetRect.width / 2) - (popoverRect.width / 2),
      targetRect.top - popoverRect.height - 5 - data.margin
    ];

    arrowXY = [popoverXY[0], popoverXY[1]];
    arrowXY[0] = popoverRect.width / 2 - 5;

    const placeTopBottom = function(popoverXY, arrowXY) {

      popoverXY = [
        targetRect.left + (targetRect.width / 2) - (popoverRect.width / 2),
        targetRect.top - popoverRect.height - 5 - data.margin
      ];

      arrowXY = [popoverXY[0], popoverXY[1]];
      arrowXY[0] = popoverRect.width / 2 - 5;

      arrow.style.borderLeftColor = 'transparent';
      arrow.style.borderRightColor = 'transparent';

      if (popoverXY[1] - window.pageYOffset < 0) { // clipped at top of browser?
        arrowXY[1] = -10;
        popoverXY[1] = targetRect.bottom + 5 + data.margin;

        arrow.style.borderBottom = '5px solid ' + data.color;
        popover.classList.add('bottom');
      } else { // top
        arrowXY[1] = popoverRect.height;
        arrow.style.borderTopColor = data.color;
      }

      if (popoverXY[0] < 0) { // are we clipped on the left of the browser window ?
        popoverXY[0] = 5;
        arrowXY[0] = targetRect.left + targetRect.width / 2 - 10;
      } else if (popoverXY[0] < targetRect.left) { // is the popover further left than the target?
        popoverXY[0] = targetRect.left - 5;
        arrowXY[0] = targetRect.width / 2;
      }

      if (popoverXY[0] + popoverRect.width > window.innerWidth ) { // are we clipped on the right side of the browser window?
        popoverXY[0] = window.innerWidth - popoverRect.width - 5;
        arrowXY[0] = popoverRect.width - targetRect.width / 2;
      }

      return [popoverXY, arrowXY];
    };

    if (! data.position || data.position !== "side") { // assume top of target

      const ret = placeTopBottom(popoverXY, arrowXY);
      popoverXY = ret[0];
      arrowXY = ret[1];

    } else { // right-side of target
      popoverXY[0] = targetRect.left + targetRect.width + 5 + data.margin;
      popoverXY[1] = targetRect.top + targetRect.height / 2 - popoverRect.height / 2;

      arrow.style.borderRightColor = data.color;

      if (popoverXY[1] - window.pageYOffset < 0) {
        popoverXY[1] = window.pageYOffset + data.margin;
        arrowXY[1] = 5;
      } else {
        arrowXY[1] = popoverRect.height / 2 - 5;
      }

      arrowXY[0] = -10;

      if (popoverXY[0] + popoverRect.width > window.innerWidth) { // if clipped on right side, move to the left

        popoverXY[0] = targetRect.left - popoverRect.width - 5 - data.margin;
        popover.classList.add('left');
        arrowXY[0] = popoverRect.width;

        arrow.style.borderRightColor = 'transparent';
        arrow.style.borderLeftColor = data.color;
      }

      if (popoverXY[0] < 0) { // if also clipped on the left side, move to top/bottom
        const ret = placeTopBottom(popoverXY, arrowXY);
        popoverXY = ret[0];
        arrowXY = ret[1];
      }
    }

    setStyles(popover, { left: parseInt(popoverXY[0], 10) + 'px', top: parseInt(popoverXY[1], 10) + 'px', backgroundColor: data.color });
    setStyles(arrow, { left: parseInt(arrowXY[0], 10) + 'px', top: parseInt(arrowXY[1], 10) + 'px' });
  },
  timeouts = {}, // store window.setTimeout handles for popover hiding
  pops = {};     // store popover HTMLElements keyed by their id attribute

  /**
   *
   *
   * @param {Object} config (optional) - control behaviour of Popover object
   * @param {Object} defaults (optional) - default properties for individual popover elements
   */
  const Popover = function(config, defaults) {
    const
    self = this,
    defaultConfig = {
      attribute: ATTR,
      debug: false,
      root: document.body,
      delay: { pop: 200, unpop: 300 },
      factory: null
    },
    defaultProperties = {
      color: COLOR,
      margin: MARGIN,
      destroy: true,
      'class': ''
    },

    /*
     *
     * @param e {MouseEvent} - mouseevent for the target element
     * @param delay {Int}
     */
    off = function(e, delay) {
      const
      target = e.target,
      f = function() {
        const id = target.getAttribute('id');
        target.removeAttribute('aria-describedBy');
        try {
          const pop = pops[id + '-popover'];
          const data = getDataForNode(self,target);

//          console.log(data);

          if (pop) {
            if (! self.debug) {
              self.events.unpop(target, pop);
              if (data.destroy) {
                delete pops[id + '-popover'];
                pop.parentNode.removeChild(pop);
              } else {
                pop.classList.remove('pop');
              }
            }
          }
        } catch (e) {
          if (self.debug) {
            window.console.log('ERROR', e);
          }
        }
      };

      timeouts[target.getAttribute('id')] = window.setTimeout(f, arguments.length === 1 ? self.delay.unpop : delay);
    },


    /* Invoked when mouse hovers over the popover element
     *
     * @param e {MouseEvent}
     */
    over = function(e) {
      const n = e.target,
      id = n.getAttribute('id').replace('-popover', '');

      n.addEventListener('mouseleave', () => {
        off({ target: document.getElementById(id) });
      });

      if (timeouts[id]) {
        window.clearTimeout(timeouts[id]);
        delete timeouts[id];
      }
    },

    /* Invoked when the mouse enters the popover target element
     *
     * @param e {MouseEvent}
     * @param delay {Int} - number of milliseconds to delay
     */
    on = function(e, delay) {

      if (! self.enabled) {
        return;
      }

//      console.log('on', e.target);

      const
      target = e.target,
      data = getDataForNode(self, target);

      data.class = (data.class ? data.class : '') + (data.position === "side" ? ' side' : ' top')  +' rmr-popover' + (data.persist ? ' persist' : '');
      data.id = target.getAttribute('id') + '-popover';

      let n = document.querySelector('#' + data.id);
      if (! n) {
        n = makeElement('div', {'data-target': target.getAttribute('id'), role: 'tooltip', class: data.class, id: data.id });
      }

      const
      popper = function() {
        if (n) {
          n.classList.add('pop');
          if (pops[n.getAttribute('id')]) { // fire event listener
            self.events.pop(target, n);
          }
        }
      };

      if (self.debug) {
        window.console.log(data);
      }

      let reference = null;

      if (data.node) {

        reference = RMR.Node.get(data.node);
        if (! reference) {
          console.warn('Invalid reference node ' + data.node + ' for popover');
        }
        reference = reference.cloneNode(true);
        reference.removeAttribute('aria-hidden');
      }

      // if a popover with this id already exists, don't display the one we just created

      // if there's no content and no specific class, abort since it's an empty popover
      if (! data.content && ! data.class && ! reference && ! data.url) {
        return;
      }

      const show = function(content) {

        if (! n.parentNode) {
          n.innerHTML = '<b class="arrow"></b><div class="bd">' + content + '</div>';
          window.document.body.appendChild(n);
        }

        if (reference) {
          const bd = n.querySelector('div.bd');
          bd.innerHTML = '';
          bd.appendChild(reference);
        }

        target.setAttribute('aria-describedby', data.id);

        positionPopover(n, target, data);

        pops[data.id] = n;

        window.setTimeout(
          () => {
            popper();
          }, delay ? delay : 0);

        //
        if (! data.persist) {
          n.addEventListener('mouseenter', over);
        }

//        n.setAttribute('data-shown', true);
      };

      if (data.url && ! n.parentNode) {
        RMR.XHR.request({url: data.url}, (xhr) => {
          if (xhr.status === 200) {
            show(xhr.responseText);
          } else {
            if (self.debug) {
              window.console.error('Popover XHR request failed', data.url);
            }
          }
        });
      } else {
//        window.document.body.appendChild(n);
        show(data.content ? data.content : '');
      }
    };

    config = merge(defaultConfig, config);

    let
    nodes = null,
    i = 0,
    n = null,
    node = null,
    l = null,
    data = null;

    if (! config.hasOwnProperty('delay')) {
      config.delay = defaultConfig.delay;
    } else if (typeof config.delay === 'number') {
      config.delay = { pop: config.delay, unpop: config.delay };
    }

    config = merge(defaultConfig, config);
    this.defaults = merge(defaultProperties, defaults);

    // two events are fired
    this.events = {
      pop: function(/* target, popover*/) { },
      unpop: function(/* target, popover*/) { }
    };
    this.enabled = true;
    this.attribute = config.attribute;
    this.delay = config.delay;
    this.destroy = config.destroy;
    this.factory = config.factory;
    this.debug = config.debug;
    this.listeners = {};

    node = config.root ?
      (config.root instanceof Element ? config.root : document.querySelector(config.root))
      : document.body;

    if (! node) {
      throw Error('Invalid Popover root [' + config.root + ']');
    }

    this.root = node;

    //
    nodes = arr(node.querySelectorAll('[' + this.attribute + ']'));

    // add root node if it has the data-popover attribute
    if (node.hasAttribute(this.attribute)) {
      nodes.push(node);
    }

    // init

    for (i = 0; i < nodes.length; i++) {
      n = nodes[i];

      // ensure target has unique id
      if (! n.getAttribute('id')) {
        n.setAttribute('id', guid('popover-target') );
      }

      // clear out title since we don't want the tooltip to obscure the popover
      if (n.hasAttribute('title')) {
        n.setAttribute('title', '');
      }

      l = {
        on: function(e) {
          if (e.type === 'click') { e.preventDefault(); }
          on(e, self.delay.pop);
        },
        off: function(e) {
          off(e, self.delay.unpop);
        }
      };
      data = getDataForNode(this, n);

      this.listeners[n.getAttribute('id')] = {
        pop: l.on,
        unpop: l.off
      };

      if (data.persist) { // if this is a persistent popover, create it immediately
        l.on({ target: n });
//        positionPopover(RMR.Node.get('#' + n.getAttribute('aria-describedby')), n, getDataForNode(self, n));
      } else {            // otherwise attach the necessary listeners for mouse/touch interaction
        if (data.events && data.events.pop) {
          n.addEventListener(data.events.pop, l.on);
        } else {
          n.addEventListener('touchstart', l.on);
          n.addEventListener('mouseenter', l.on);
        }

        if (data.events && data.events.unpop) {
          n.addEventListener(data.events.unpop, l.off);
        } else {
          n.addEventListener('touchend', l.off);
          n.addEventListener('mouseleave', l.off);
        }
      }
    }

    /*
     * Re-position all persistent popovers on window resize
     */
    this.windowResizer = function() {
      let
      target = null,
      i = 0;

      const persists = arr(document.querySelectorAll('.rmr-popover.persist'));

      for (i = 0; i < persists.length; i++) {
        target = document.getElementById(persists[i].getAttribute('data-target'));

        positionPopover(
          persists[i],
          target,
          getDataForNode(this, target)
        );
      }
    };

    window.addEventListener(
      'resize',
      function windowResize() {
        self.windowResizer();
      }
    );

    // position persistent popovers
    window.setTimeout(function() {
      self.windowResizer();
    }, 0);

    this.set = function(key, value) {
      if (! this.defaults.hasOwnProperty(key)) {
        throw new Error('Invalid key ', key);
      }
      this.defaults[key] = value;
    };

    this.destroy = function() {
      let n, data, i;
      for (i in this.listeners) {
        if (! this.listeners.hasOwnProperty(i)) {
          continue;
        }

        n = document.getElementById(i);
        if (!n) {
          continue;
        }
        data = getDataForNode(this, n);

        if (data.events && data.events.pop) {
          n.removeEventListener(data.events.pop, this.listeners[i].pop);
        } else {
          n.removeEventListener('mouseenter', this.listeners[i].pop);
          n.removeEventListener('touchstart', this.listeners[i].pop);
        }

        if (data.events && data.events.unpop) {
          n.removeEventListener(data.events.unpop, this.listeners[i].unpop);
        } else {
          n.removeEventListener('mouseleave', this.listeners[i].unpop);
          n.removeEventListener('touchend', this.listeners[i].unpop);
        }

        // remove all popovers
        off( { target: n }, 0);
      }

      // remove resize listener
      window.removeEventListener('resize', this.windowResizer);

      return this;
    };

    if (this.debug) {
      window.console.log(this.toString());
    }

    this.windowResizer();
  };

  /**
   * Attach a listener to `pop`/`unpop` events
   *
   * @param {String} event - one of `pop` or `unpop`
   * @param {Function} method - the method that will be invoked on the relevant event
   * @return {Object} - instance for chaining
   * @chainable
   */
  Popover.prototype.on = function(event, method) {
    this.events[event] = method;
    return this;
  };

  /**
   * Return a string representation of the instance
   *
   * @return {String} description of object
   */
  Popover.prototype.toString = function() {
    return 'Popover ' + JSON.stringify({root: '' + this.root, enabled: this.enabled, delay: this.delay, debug: this.debug});
  };

  module.exports = Popover;
})();
