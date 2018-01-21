/*
 * Bridge the gap between browsers' various implementations of zooming elements to full-screen.
 * https://developer.mozilla.org/en/DOM/Using_full-screen_mode
 *
 */

/**
 @module fullscreen
 */
(function() {
  'use strict';

  let
  i,
  prefix;

  const
  CLASSNAME = 'rmr-screen',
  extensions = ['webkit','moz','o','ms','khtml'],
  _bridge = {
    prefix: '',
    supported: false,
    isFullScreen: function() {
      return false;
    },
    exit: function() { },
    request: function() { },
    eventName: null
  };

  if (typeof document.cancelFullScreen !== 'undefined') { // check for native support
    _bridge.supported = true;
  } else {
    for (i = 0; i < extensions.length; i++ ) { // check for fullscreen support by vendor prefix
      prefix = extensions[i];
      if (typeof document[prefix + 'CancelFullScreen' ] !== 'undefined') {
        _bridge.supported = true;
        _bridge.prefix = prefix;
        break;
      }
    }
  }

  if (_bridge.supported) {
    _bridge.eventName = _bridge.prefix + 'fullscreenchange';
    _bridge.request = function(node) {
      return ! prefix ? node.requestFullScreen() : node[prefix + 'RequestFullScreen']();
    };

    // normalize method to exit out of fullscreen mode
    _bridge.exit = function(/* node */) {
      return ! prefix ? document.cancelFullScreen() : document[prefix + 'CancelFullScreen']();
    };

    // normalize method to determine if we're currently in fullscreen mode
    _bridge.isFullScreen = function() {
      let r = null;
      switch (prefix) {
        case 'webkit':
          r = document.webkitIsFullScreen;
          break;
        case 'moz':
          r = document.mozFullScreenElement;
          break;
        default:
          if (document.hasOwnProperty('fullScreen')) {
            r = document.fullScreen;
          } else if (document.hasOwnProperty('fullscreen')) {
            r = document.fullscreen;
          }

          r = document[prefix + 'FullScreen'];
      }

      return r;
    };
  }

   /**
    * Create a new Screen instance
    *
    * @param {String} node - the node that will be full-screened
    * @return {Object} instance
    */
  const FullScreen = function(node) {
    this.node = typeof node === 'string' ? document.querySelector(node) : node;

    if (! (this.node instanceof HTMLElement)) {
      throw Error('Invalid FullScreen node <' + node + '>');
    }

    this.events = {
      'exit': function() { },
      'fullscreen': function() { }
    };

    const
    self = this,
    listener = function() {
      if (self.isFullScreen()) {
        self.events.fullscreen();
        self.node.classList.add(CLASSNAME);
      } else {
        self.events.exit();
        self.node.classList.remove(CLASSNAME);
      }
    };

    if (_bridge.prefix === 'moz') {
      document.addEventListener('mozfullscreenchange', listener);
    } else {
      self.node.addEventListener(_bridge.eventName, listener);
    }

    return this;
  };


   /**
    * Determine whether or not the browser has full-screen support
    *
    * @return {Boolean} `true` if the browser supports full-screen; `false` if not
    */
  FullScreen.prototype.isSupported = function() {
    return _bridge.supported;
  };

   /**
    * Request full-screen mode
    *
    * @return {Object} instance
    * @chainable
    */
  FullScreen.prototype.request = function() {
      _bridge.request(this.node);
      return this;
  };


   /**
    * Determine if the node is in full-screen mode
    *
    * @return {Boolean} `true` if node is in full-screen mode; `false` if not
    */
  FullScreen.prototype.isFullScreen = function() {
    return _bridge.isFullScreen();
  };


   /**
    * Assign handler for a Screen event
    *
    * @param {String} eventName - event name to attach to, one of 'fullscreen' or 'exit'
    * @param {Function} func - function to invoke when event occurs
    * @return {FullScreen} instance for chaining
    * @chainable
    */
  FullScreen.prototype.on = function(eventName, func) {
    this.events[eventName] = func;
    return this;
  };

  /**
    * Exits full-screen mode if enabled, or requests the screen if not
    *
    * @return {FullScreen} instance for chaining
    * @chainable
    */
  FullScreen.prototype.toggle = function() {
    if (this.isFullScreen()) {
      this.exit();
    } else {
      this.request();
    }
    return this;
  };

  /**
    * Exit full-screen mode
    *
    * @return {Object} instance for chaining
    * @chainable
    */
  FullScreen.prototype.exit = function() {
    _bridge.exit();
    return this;
  };

  /**
    * Return a String instance
    *
    * @return {String} describing object
    */
  FullScreen.prototype.toString = function() {
    return 'Screen <' + this.node.toString() + '>';
  };

  module.exports = FullScreen;
})();
