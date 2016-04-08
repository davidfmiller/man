/* jshint undef: true,strict:true,trailing:true,loopfunc:true */
/* global document,window,HTMLElement */

(function() {

  'use strict';

  // prevent duplicate declaration
  if (window.Man) { return; }

  var

  //
  VERSION = '0.0.1',

  /*
   * Generate a unique string suitable for id attributes
   *
   * @param basename (String)
   * @return string
   */
  guid = function(basename) {
    return basename + '-' + parseInt(Math.random() * 100, 10) + '-' + parseInt(Math.random() * 1000, 10);
  },

  /*
   * Merge two objects into one, values in b take precedence over values in a
   *
   * @param a {Object}
   * @param b {Object}

   * @return Object
   */
  merge = function(a, b) {
    var o = {};
    for (var i in a) {
      o[i] = a[i];
    }
    if (! b) { return o; }
    for (i in b) {
      o[i] = b[i];
    }
    return o;
  },

  /*
   * Convert an array-like thing (ex: NodeList or arguments object) into a proper array
   *
   * @param list (array-like thing)
   * @return Array
   */
  arr = function(list) {
    var ret = [], i = 0;

    if (! list.length) { return ret; }

    for (i = 0; i < list.length; i++) {
      ret.push(list[i]);
    }

    return ret;
  },

  /*
   * Create an element with a set of attributes/values
   *
   * @param type (String)
   * @param attrs {Object}
   *
   * @return HTMLElement
   */
  makeElement = function(type, attrs) {
     var
     n = document.createElement(type),
     i = null;

     for (i in attrs) {
       n.setAttribute(i, attrs[i]);
     }
     return n;
  },

  /*
   * Retrieve an object containing { top : xx, left : xx, bottom: xx, right: xx, width: xx, height: xx }
   *
   * @param node (DOMNode)
   */
  getRect = function(node) {

    var
    rect = node.getBoundingClientRect(),
    ret = { top : rect.top, left : rect.left, bottom: rect.bottom, right : rect.right }; // create a new object that is not read-only

    ret.top += window.pageYOffset;
    ret.left += window.pageXOffset;

    ret.bottom += window.pageYOffset;
    ret.right += window.pageYOffset;

    ret.width = rect.right - rect.left;
    ret.height = rect.bottom - rect.top;

    return ret;
  },

  /*
   *
   * @param node {HTMLElement}
   * @param styles {Object}
   */
  setStyles  = function(node, styles) {
    for (var i in styles) {
      node.style[i] = styles[i];
    }
  };


  /**
   *
   *
   * @param node (node, optional) - the root element containing all elements with attached popovers
   * @param options (Object, optional) method to retrieve the popover's data for a given node
   */
  window.Man = function(config, defaults) {

    var
    $ = this,
    nodes,
    i = 0,
    n,
    node,
    over,
    defaultConfig = {
      debug : false,
      root : document.body,
      delay : { pop : 200, unpop : 300 },
      factory : null
    },
    defaultProperties = {
    };

    config = merge(defaultConfig, config);
    this.defaults = merge(defaultProperties, defaults);

    node = document.body;

    if (! config.pre) { return; }

    nodes = arr(node.querySelectorAll('pre'));

    for (i = 0; i < nodes.length; i++) {
      var
      pre = nodes[i],
      lines = pre.innerHTML.split("\n"),
      buf = '<table><tbody>';

      if (lines.length <= 1 || pre.hasAttribute("data-no-lines")) { continue; }

      for (var j = 0; j < lines.length; j++) {

        buf += '<tr><td class="col" data-line-number="' + (j + 1) + '"></td><td>' + lines[j] + '</td></tr>';
      }

      buf += '</tbody></table>';
      pre.innerHTML = buf;
    }

    if (this.debug) { window.console.log(this.toString()); }
  };

  /**
   * Return a string representation of the instance
   *
   * @return {String}
   */
  window.Man.prototype.toString = function() {
    return 'Man'; // + JSON.stringify({root : '' + this.root, enabled : this.enabled, delay : this.delay, debug : this.debug});
  };

}());


