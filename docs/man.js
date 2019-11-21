/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/* global require, module, console, Promise, HTMLElement */

(() => {

  'use strict';

  /**
   * rmr-util
   *
   * JS for your browser
   *
   *
   *
   */


  const

  /**
   *
   *
   */
   Base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function(e) {
      let t="";
      let n,r,i,s,o,u,a;
      let f=0;
      e = Base64._utf8_encode(e);
      while (f <e.length) {
        n = e.charCodeAt(f++);
        r = e.charCodeAt(f++);
        i = e.charCodeAt(f++);
        s = n >> 2;
        o = (n&3)<<4|r>>4;
        u=(r&15)<<2|i>>6;
        a = i & 63;
        if (isNaN(r)) {
          u = a = 64;
        } else if (isNaN(i)) {
          a =64;
        }
        t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a);
      }
      return t;
    },

    decode: function(e) {

      let t = "";
      let n,r,i, s,o,u,a;
      let f = 0;

      e = e.replace(/[^A-Za-z0-9\+\/\=]/g,"");

      while (f < e.length) {
        s = this._keyStr.indexOf(e.charAt(f++));
        o = this._keyStr.indexOf(e.charAt(f++));
        u = this._keyStr.indexOf(e.charAt(f++));
        a = this._keyStr.indexOf(e.charAt(f++));
        n = s << 2 | o>>4;
        r = (o & 15) << 4 | u >> 2;
        i = (u & 3) << 6 | a;
        t = t + String.fromCharCode(n);
        if (u !== 64) {
          t = t+String.fromCharCode(r);
        }
        if (a !== 64) {
          t = t+String.fromCharCode(i);
        }
      }
      t = Base64._utf8_decode(t);
      return t;
    },
    _utf8_encode: function(e) {
      e = e.replace(/\r\n/g,"\n");
      let t="",
      n = 0;
      for (n = 0; n < e.length;n++) {
        const r = e.charCodeAt(n);
        if (r < 128) {
          t += String.fromCharCode(r);
        } else if (r > 127 && r < 2048) {
          t += String.fromCharCode(r>>6|192);
          t += String.fromCharCode(r&63|128);
        } else {
          t += String.fromCharCode(r>>12|224);
          t += String.fromCharCode(r>>6&63|128);
          t += String.fromCharCode(r&63|128);
        }
      }
      return t;
    },

    _utf8_decode: function(e) {
      let
      t = "",
      n = 0,
      r = 0,
      c2 = 0,
      c3 = 0;

      while (n < e.length) {
        r = e.charCodeAt(n);
        if (r<128) {
          t += String.fromCharCode(r);
          n++;
        } else if (r > 191 && r < 224) {
          c2 = e.charCodeAt(n+1);
          t += String.fromCharCode((r&31)<<6|c2&63);
          n += 2;
        } else {
          c2 = e.charCodeAt(n+1);
          c3 = e.charCodeAt(n+2);
          t += String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);
          n += 3;
        }
      }
      return t;
    }
  },

  /**
   * Retrieve an element via query selector, or
   *
   * @param {Mixed} arg the element to retrieve, or null if no such element exists
   * @return {Element} element corresponding to the selector (or null if none exists)
   */
  getElement = function(arg) {
    if (typeof arg === 'string') {
      return document.querySelector(arg);
    } else if (arg instanceof HTMLElement) {
      return arg;
    }

    return null;
  },

  /**
   * Determine if a string is a valid internet URL
   *
   * @param {String} str - the string to be tested
   * @return {Bool} - `true` of `false`
   */
  isURL = function(str) {
    // ???
    return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(str);
  },


  /**
    Format a latitude coordinate value into a human-friendly string

    @param {Float} lat  value to be formatted
    @return {String} formatted latitude string
   */
  formatLatitude = function(lat) {

    let value = parseFloat(lat);

    const dir = value <  0 ? 'S' : 'N';

    let degrees = 0, minutes = 0, seconds = 0;

    degrees = parseInt(value);
    value = (value - degrees) * 60;

    minutes = parseInt(value);
    seconds = (value - minutes) * 60;

    if (seconds < 0) {
      seconds *= -1;
    }

    return Math.abs(degrees) + 'º' + Math.abs(minutes) + '’' + seconds.toFixed(2) + '”' + dir;
  },

  /**
    Format a longitude coordinate value into a human-friendly string

    @param {Float} lon  value to be formatted
    @return {String} formatted longitude string
   */
  formatLongitude = function(lon) {

    let value = parseFloat(lon);

    const dir = value <  0 ? 'W' : 'E';

    let degrees = 0, minutes = 0, seconds = 0;

    degrees = parseInt(value);
    value = (value - degrees) * 60;

    minutes = parseInt(value);
    seconds = (value - minutes) * 60;

    return Math.abs(degrees) + 'º' + Math.abs(minutes) + '’' + Math.abs(seconds.toFixed(2)) + '”' + dir;
  },


  /**
   * Determine if a node matches a provided selector
   *
   * @param {HTMLElement} node  the element to be tested
   * @param {String} selector the selector string to test
   * @return {Bool} `true` or `false`
   */
  selectorMatches = function (node, selector) {

    const
    p = Element.prototype,
    f = p.matches || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector || function matches() {
      return [].indexOf.call(document.querySelectorAll(selector), this) !== -1;
    };
    try {
      return f.call(node, selector);
    } catch (e) {
      return false;
    }
  },

  /**
   * Determine if we're in a touch-based browser (phone/tablet)
   *
   * @return {Bool} `true` or `false`
   */
  isTouch = function() {

    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
      return false;
    }
    return typeof window.orientation !== 'undefined';
  },

  /**
   * Determine if we're in Safari
   *
   * @return {Bool} `true` or `false`
   */
  isSafari = function() {

    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
      return false;
    }
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  },

  /**
   * Determine if we're in Firefox
   *
   * @return {Bool} `true` or `false`
   */
  isFirefox = function() {

    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
      return false;
    }
    return navigator.userAgent.indexOf("Firefox") > 0;
  },

  /**
   * Is the browser capable of opening new windows/tabs with "data:" protocol
   *
   * @see https://groups.google.com/a/chromium.org/forum/#!topic/blink-dev/GbVcuwg_QjM%5B1-25%5D
   * @return {Bool} `true` if the browser opens `data:` URLs; `false` if not
   */
  opensData = function() {
    return isFirefox() || isSafari();
  },

  /**
   * Retrieve an object containing browser/screen coordinates for a DOM element
   *
   * @param {Element} node the element whose coordinates should be retrieved
   * @return {Object} An object containing { top : xx, left : xx, bottom: xx, right: xx, width: xx, height: xx }
   */
  getRect = function(node) {

    node = getElement(node);
    if (!node) {
      return { top: 0, left: 0, right: 0, width: 0, height: 0 };
    }

    const
    rect = node.getBoundingClientRect(),
    ret = { top: rect.top, left: rect.left, bottom: rect.bottom, right: rect.right }; // create a new object that is not read-only

    ret.top += window.pageYOffset;
    ret.left += window.pageXOffset;

    ret.bottom += window.pageYOffset;
    ret.right += window.pageYOffset;

    ret.width = rect.right - rect.left;
    ret.height = rect.bottom - rect.top;

    return ret;
  },

  /**
   * Scroll to an element
   *
   * @param {Mixed} y - vertical offset to scroll to, or selector/node references for the Element to scroll to
   * @param {Integer} duration - # of milliseconds animation should run
   */
  scrollTo = function(y, duration) {

    if (arguments.length === 1) {
      duration = 200;
    }

    if (typeof y === 'string' || y instanceof Element) {
      y = getRect(y).top;
    }

    const
    startingY = window.pageYOffset,
    diff = y - startingY;

    let start;

    // Bootstrap our animation - it will get called right before next frame shall be rendered.
    window.requestAnimationFrame(function step(timestamp) {

      if (!start) {
        start = timestamp;
      }

      const
      time = timestamp - start,
      percent = Math.min(time / duration, 1);

      window.scrollTo(0, startingY + diff * percent);

      // Proceed with animation as long as we wanted it to.
      if (time < duration) {
        window.requestAnimationFrame(step);
      }
    });
  },


  /*
   * Generate a unique string suitable for id attributes
   *
   * @param basename (String)
   * @return string
   */
  guid = function(basename) {
    return (basename ? basename : 'rmr-guid-') + parseInt(Math.random() * 100, 10) + '-' + parseInt(Math.random() * 1000, 10);
  },

  /*
   * Merge two objects into one, values in b take precedence over values in a
   *
   * @param a {Object}
   * @param b {Object}

   * @return Object
   */
  objectMerge = function(a, b) {
    const o = {};
    let i = null;
    for (i in a) {
      if (a.hasOwnProperty(i)) {
        o[i] = a[i];
      }
    }
    if (! b) {
      return o;
    }
    for (i in b) {
      if (b.hasOwnProperty(i)) {
        o[i] = b[i];
      }
    }
    return o;
  },

  /**
   * Convert an array-like thing (ex: NodeList or arguments object) into a proper array, or convert a scalar into a single-element array
   *
   * @param {Mixed} list an array-like thing or a scalar
   * @return {Array} the param as an array
   */
  arr = function(list) {

    const ret = [];
    let i = 0;

    if (list instanceof Array) {
      return list;
    }

    if (typeof list.length !== 'number') {
      return [list];
    }

    for (i = 0; i < list.length; i++) {
      if (list.hasOwnProperty(i)) {
        ret.push(list[i]);
      }
    }

    return ret;
  },


  /**
   * Remove an object from an array
   *
   * @param {Array} array containing object to be removed
   * @param {Any} item to be removed
   * @return {Array} array for chaining
   */
  arrayRemove = function(array, item) {
    return arr(array).filter(e => e !== item);
  },

  /**
   * Return the index of an item in an array
   *
   * @param {Array} list that should be searched
   * @param {Function} func comparator function that takes on argument
   * @return {Integer} index of the item in the array, or -1 if it doesn't exist
   */
  arrayFind = function(list, func) {

    const array = arr(list);

    if (typeof func !== 'function') {

      const
      target = func,
      lookup = function(param) {

        if (typeof param === 'object' && param.hasOwnProperty('id')) {
          if (typeof target === 'object' && target.hasOwnProperty('id')) {
            return param.id === target.id;
          }
          return param.id === target;
        }

        return param === target;
       };
      func = lookup;
    }
    for (const i in array) {
      if (! array.hasOwnProperty(i)) {
        continue;
      }

      if (array[i] === func || func(array[i])) {
        return parseInt(i, 10);
        break;
      }
    }
    return -1;
  },

  /**
   * Shift the objects within an array so that a given item is first
   *
   * @param {Array} array containing object to be removed
   * @param {Any} item to be made the first
   * @return {Array} array for chaining
   */
  arrayReorder = function(array, item) {

    const
      list = arr(array),
      reordered = [];

    const index = arrayFind(list, item);
    if (index === -1) {
      return list;
    }

    reordered.push(list[index]);

    for (let i = index + 1; i < list.length; i++) {
      reordered.push(array[i]);
    }

    for (let i = 0; i < index; i++) {
      reordered.push(array[i]);
    }

    return reordered;
  },


  /**
   * Remove all children from a node
   *
   * @param {Mixed} arg - node or selector whose children should be removed
   * @return {HTMLElement} - for chaining
   */
  pruneElement = function(arg) {

    const node = getElement(arg);
    if (! node) {
      return null;
    }
    while (node.firstChild) {
      node.removeChild(node.firstChild);
    }

    return node;
  },


  /**
   * Retrieve an element via query selector
   *
   * @param {Mixed} arg selector, or an array of elements to attach
   * @param {mixed,optional} scope the parent node
   * @return {[Element]} array of elements
   */
  getElements = function(arg, scope) {

    if (! scope) {
      scope = document;
    }
    else {
      scope = getElement(scope);
    }

    if (typeof arg === 'string') {
      return arr(scope.querySelectorAll(arg));
    }

    return arr(arg);
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

     const n = document.createElement(type);

     for (const i in attrs) {
       if (attrs.hasOwnProperty(i) && attrs[i]) {
         n.setAttribute(i, attrs[i]);
       }
     }
     return n;
  },

  /**
   * Make loader
   *
   * @return {String} SVG element
   */
  loader = function() {

/*
    const svg = makeElement('svg', {
      version: '1.1',
      class: 'rmr-loader',
      xmlns: 'http://www.w3.org/2000/svg',
      'xmlns:xlink': 'http://www.w3.org/1999/xlink',
      x: '0px',
      y: '0px',
      width: '40px',
      height: '40px',
      viewBox: '0 0 40 40',
      'enable-background': 'new 0 0 40 40',
      'xml:space': 'preserve'
    });

    svg.innerHTML =
    '<path opacity="0.2" fill="#000" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946 s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634 c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"></path>' +
    '<path fill="#000" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0 C22.32,8.481,24.301,9.057,26.013,10.047z">' +
    '<animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 20 20" to="360 20 20" dur="0.8s" repeatCount="indefinite"></animateTransform>' +
    '</path>';
*/

    return '<svg version="1.1" class="rmr-loader" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="40px" height="40px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve">' +
    '<path opacity="0.2" fill="#000" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946 s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634 c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"></path>' +
    '<path fill="#000" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0 C22.32,8.481,24.301,9.057,26.013,10.047z">' +
    '<animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 20 20" to="360 20 20" dur="0.8s" repeatCount="indefinite"></animateTransform>' +
    '</path>' +
    '</svg>';

//    return svg;
  },


  /**
   * Localize a string
   *
   * {
   *   'en' : {
   *      'key' : 'neighbor'
   *    },
   *    'en-ca' : {
   *      'key' : 'neighbour'
   *    }
   *  }
   *
   * @param {Object} lookup dictionary
   * @param {String} key the to localize
   * @return {String} string
   */
  localize = function(lookup, key) {

    if (typeof navigator === 'undefined') {
      return key;
    }

    let i, lang;

    for (i in navigator.languages) {
      if (! navigator.languages.hasOwnProperty(i)) {
        continue;
      }
      lang = navigator.languages[i].toLowerCase();
      if (lookup.hasOwnProperty(lang) && lookup[lang].hasOwnProperty(key)) {
        return lookup[lang][key];
      }
    }

    for (i in navigator.languages) {
      if (! navigator.languages.hasOwnProperty(i)) {
        continue;
      }
      lang = navigator.languages[i].split('-')[0].toLowerCase();
      if (lookup.hasOwnProperty(lang) && lookup[lang].hasOwnProperty(key)) {
        return lookup[lang][key];
      }
    }

//    console.warn('No localization for ' + key);
    return key;
  },

  /**
   * Apply styles to a node
   *
   * @param {HTMLElement} node that should have styles applied
   * @param {Object} styles key/value pairs for styles and values
   * @return {Element} node
   */
  setStyles = function(node, styles) {

    node = getElement(node);
    if (! node) {
      return false;
    }

    for (const i in styles) {
      if (styles.hasOwnProperty(i) && styles[i]) {
        node.style[i] = styles[i];
      }
    }

    return node;
  },

  /**
   * Build a query string from an object
   *
   * @param {Object} obj the object to be passed via URL
   * @return {String} str query string corresponding to the object
   */
  queryString = function(obj) {

    if (Object.keys(obj).length === 0) {
      return '';
    }

    return Object.keys(obj).reduce((a,k) => {
      a.push(k + '=' + encodeURIComponent(obj[k]));
      return a;
    },[]).join('&');
  },


  /**
   * Return an array of all keys in an object (polyfill for Object.keys)
   *
   * @param {Object} obj object whose keys should be retrieved
   * @return {Array} key list
   */
  objectKeys = function(obj) {

    if (typeof Object !== "undefined" && typeof(Object.keys) !== "undefined") {
      return Object.keys(obj);
    }

    const a = [];
    for (const i in obj) {
      if (obj.hasOwnProperty(i)) {
        a.push(i);
      }
    }

    return a;
  },

  /**
   * Retrieve (potentially nested) value from object
   *
   * @param {Object} object - target object to be inspected
   * @param {String} path - nested paths
   * @param {Mixed} fallback - value to return if path not found (default to `null`)
   * @return {Mixed} - value found at path, or `null` if no such path exists
   */
  objectGet = function(object, path, fallback) {

    const bits = path.split('.');
    let target = object;

    for (let i = 0; i < bits.length; i++) {
      if (! target.hasOwnProperty(bits[i])) {
        return fallback ? fallback : null;
      }
      target = target[bits[i]];
    }

    return target;
  },


  /**
   * Generate an object containing keys/values corresponding to form elements
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects
   * @param {Element} form element
   * @return {Object} the key/value pairs for the form
   */
  objectFromForm = function(form) {

    form = getElement(form);
    if (! form) {
      return {};
    }

    if (typeof FormData !== 'undefined') {
//      const f = new FormData(form);
//      console.log(f);
//      return f;
    }

    const
    inputs = form.querySelectorAll('select,input,textarea'),
    params = {};

    for (const i in inputs) {
      if (! inputs.hasOwnProperty(i)) {
        continue;
      }
      const
        name = inputs[i].getAttribute('name'),
        type = inputs[i].type ? inputs[i].type : 'text';

      if (inputs[i].hasAttribute('disabled')) {
        continue;
      }

      if (type === 'radio' || type === 'checkbox') {
        if (inputs[i].checked) {
          params[name] = inputs[i].value;
        }
      } else {
        params[name] = inputs[i].value;
      }
    }

    return params;
  },

  /**
   * Add event listener to >= 1 node
   *
   * @param {String} selector to match nodes
   * @param {String} eventName the event which should be listened for
   * @param {Function} func the method to invoke when eventName occurs
   */
  addListener = function(selector, eventName, func) {
    const nodes = getElements(selector);
    let i = 0;

    for (i in nodes) {
      if (nodes.hasOwnProperty(i)) {
        nodes[i].addEventListener(eventName, func);
      }
    }
  },

  /**
   * Get a node's ancestor
   *
   * @param {Element} node starting point of search
   * @param {String} ancestor the selector for the ancestor we're looking for
   * @param {Bool} includeSelf optionally include starting point in search
   * @return {Element} or `null` if no such ancestor exists
   */
  ancestor = function(node, ancestor, includeSelf) {

    node = getElement(node);
    if (! node) {
      return null;
    }

    if (includeSelf && selectorMatches(node, ancestor)) {
      return node;
    }

    let parent = node;

    if (! parent.parentNode) {
      return null;
    }

    while ((parent = parent.parentNode) !== null) {

      if (! parent instanceof Element) {
        return null;
      }

      if (selectorMatches(parent, ancestor)) {
        return parent;
      }
    }

    return null;
  },

  /**
   * Remove a DOM node from the document
   *
   * @param {Element} node the node to be removed
   * @return {Bool} `true` if removed'; `false` if the node doesn't exist
   */
  removeNode = function(node) {

    node = getElement(node);
    if (! node) {
      return false;
    }

    node.parentNode.removeChild(node);

    return true;
  },

  /**
   * Make an XHR request
   *
   * {
   *   form: {selector} - form element to serialize and submit via xhr
   *   url: '{string}',
   *   method: '{GET|POST}',
   *   headers: [],
   *   params: {}
   * }
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
   * @param {Object} config url, method, params, form
   * @param {Function} handler invoked on completion
   * @return {XMLHttpRequest} object making the request
   */
  xhrRequest = function(config, handler) {

    if (typeof XMLHttpRequest === 'undefined') {
      return null;
    }

    const
    defaults = {
      form: null,
      url: '/',
      headers: {},
      method: 'get',
      params: {}
    };

    config = objectMerge(defaults, config);

    if (config.form) {
      config.form = getElement(config.form);
      config.url = config.form.getAttribute('action'),
      config.method = config.form.getAttribute('method') ? config.form.getAttribute('method') : 'get',
      config.params = objectFromForm(config.form);
    }

    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {

      if (this.readyState === 4) {
        if (handler) {
          handler(xhttp);
        }
      }
    };

    let
    url = config.url,
    params = '';

    if (config.form) {
      const type = config.form.getAttribute('enctype');
      if (type) {
        config.headers['Content-Type'] = type;
      }
    }

    if (config.method.toUpperCase() === 'GET') {
      url = Object.keys(config.params).length > 0 ? (url + '?' + queryString(config.params)) : url;
    } else { // post
      params = queryString(config.params);
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }

    config.headers['X-Requested-With'] = 'XMLHttpRequest';

    xhttp.open(config.method, url, true);

    for (const h in config.headers) {
      if (config.headers.hasOwnProperty(h)) {
        xhttp.setRequestHeader(h, config.headers[h]);
      }
    }

    xhttp.send(params);

    return xhttp;
  },

  /**
   *
   *
   *

  dataFromNode = function(node) {

  },
   */

  /**
   * Retrieve the last non-empty element of an array
   *
   * @param {Array} list - array to be iterated through
   * @param {Function} func (optional) function used to evaluate items in the array
   * @return {Mixed} the last non-empty value in the array (or `null` if no such value exists)
   */
  lastValue = function(list, func) {

    list = arr(list);

    let i = list.length - 1;
    while (i >= 0) {
      if (func ? func(list[i]) : list[i]) {
        return list[i];
      }
      i--;
    }

    return null;
  };


  module.exports = {

    Base64: Base64,

    // document.body.addEventListener('keyup', function(e){ console.log(e.keyCode); });
    Keyboard: {
      next: 39,
      previous: 37,
      up: 38,
      down: 40,
      escape: 27,
      enter: 13,
      space: 32,
      digits: [ 49, 50, 51, 52, 53, 54, 55, 56, 57, 48  ], // treat 0 zero as the last ordinal

      /**
       * Determine if a keyboardEvent has a modifier key associated
       *
       * @param {KeyboardEvent} e the event
       * @return {Bool} `true` if event has a modifier key attached (control, shift, command, alt, etc.); `false` if not
       */
      hasModifier: function(e) {
        return e.metaKey || e.altKey || e.ctrlKey || e.shiftKey;
      },

      /**
       * Return the ordinal (0-9) of a keypress; -1 if N/A, key "0" return ordinal 9
       *
       * @param {Integer|Event} keyCode either the key code or the window event for a `keypress`
       * @return {Integer} ordinal for the key, or -1 if N/A
       */
      ordinal: function(keyCode) {

        keyCode = parseInt(typeof keyCode !== 'number' ? keyCode.keyCode : keyCode, 10);

        if (keyCode === 48) {
          return 9;
        } else if (keyCode >= 49 && keyCode <= 57) {
          return keyCode - 49;
        }

        return -1;
      }
    },

    Date: {

      /**
       * Convert a Date instance to RFC 3339 format, ex: `2019-01-17T17:55:48Z`
       *
       * @param {Date} date to be formatted, optional
       * @return {String} Date in RFC 3339 format
       * @see https://tools.ietf.org/html/rfc3339
       */
      toRFC3339: function(date) {

        if (! date) { date = new Date(); }

        const pad = function(n) {
          return n < 10 ? '0' + n : n;
        };

         return date.getUTCFullYear() + '-'
              + pad(date.getUTCMonth()+1) + '-'
              + pad(date.getUTCDate()) + 'T'
              + pad(date.getUTCHours()) + ':'
              + pad(date.getUTCMinutes()) + ':'
              + pad(date.getUTCSeconds()) + 'Z';
      },

      fromRFC3339: function(dString) {

        if (! dString) {
          return null;
        }

        return new Date(dString);

        const ret = new Date();

        let utcOffset, offsetSplitChar;
        let offsetMultiplier = 1;
        const dateTime = dString.split("T");
        const date = dateTime[0].split("-");
        const time = dateTime[1].split(":");
        const offsetField = time[time.length - 1];
        let offsetString;

        const offsetFieldIdentifier = offsetField.charAt(offsetField.length - 1);
        if (offsetFieldIdentifier === "Z") {
            utcOffset = 0;
            time[time.length - 1] = offsetField.substr(0, offsetField.length - 2);
        } else {
            if (offsetField[offsetField.length - 1].indexOf("+") !== -1) {
                offsetSplitChar = "+";
                offsetMultiplier = 1;
            } else {
                offsetSplitChar = "-";
                offsetMultiplier = -1;
            }
            offsetString = offsetField.split(offsetSplitChar);
            time[time.length - 1] === offsetString[0];
            offsetString = offsetString[1].split(":");
            utcOffset = (offsetString[0] * 60) + offsetString[1];
            utcOffset = utcOffset * 60 * 1000;
        }

        ret.setTime(Date.UTC(date[0], date[1] - 1, date[2], time[0], time[1], time[2]) + (utcOffset * offsetMultiplier));
        return ret;
      }
    },

    OS: {
      isApple: function() {
        const agent = window.navigator.userAgent;
        return agent.match('iPhone;') || agent.match('iPad;') || agent.match('iPod;')  || agent.match('Mac OS X');
      }
    },
    Browser: {
      isTouch: isTouch,
      isSafari: isSafari,
      isFirefox: isFirefox,
      scrollTo: scrollTo,
      opensData: opensData
    },
    String: {
      isURL: isURL,
      guid: guid,
      localize: localize
    },
    Array: {
      coerce: arr,
      last: lastValue,
      remove: arrayRemove,
      find: arrayFind,
      reorder: arrayReorder
    },
    Object: {
      keys: objectKeys,
      merge: objectMerge,
      value: objectGet,
      fromForm: objectFromForm,
      queryString: queryString
    },
    XHR: {
      request: xhrRequest
    },
    Map: {
      formatLatitude: formatLatitude,
      formatLongitude: formatLongitude
    },
    Node: {
//      data: dataFromNode,
      ancestor: ancestor,
      matches: selectorMatches,
      remove: removeNode,
      loader: loader,
      get: getElement,
      getAll: getElements,
      prune: pruneElement,
      listen: addListener,

      // TODO: deprecate `make`
      make: makeElement,
      create: makeElement,
      getRect: getRect,
      setStyles: setStyles
    }
  };

  if (typeof window !== 'undefined') {
    window.document.addEventListener('DOMContentLoaded', () => {
      document.body.classList.add('rmr-js');

      if (isTouch()) {
        document.body.classList.add('rmr-touch');

        const resizer = function() {

          const
          body = document.body,
          cls = window.innerWidth > window.innerHeight ? 'rmr-landscape' : 'rmr-portrait';

          body.classList.remove('rmr-landscape');
          body.classList.remove('rmr-portrait');

          body.classList.add(cls);
        };

        window.addEventListener('orientationchange', () => {
          resizer();
        });

        resizer();

      } else {
        const
        body = document.body,
        hover = 'rmr-hover',
        out = 'rmr-nohover';

        body.addEventListener('mouseenter', () => {
          body.classList.add(hover);
          body.classList.remove(out);
        });

        body.addEventListener('mouseleave', () => {
          body.classList.remove(hover);
          body.classList.add(out);
        });
      }
    });
  }


/*
  (function() {
    var elements = ['section', 'article', 'aside', 'header', 'footer', 'nav', 'figure', 'figcaption', 'time', 'mark', 'main'];
    for (const i in elements) {
      if (elements.hasOwnProperty(i)) {
        console.log(elements[i]);
        document.createElement(elements[i]);
      }
    }
  })();
*/
})();


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

(function() {
  const man = __webpack_require__(2);
  window.Man = man;
})();



/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {



(function() {

  'use strict';

  const

  RMR = __webpack_require__(0),
//  Fullscreen = require('./fullscreen'),
  Modal = __webpack_require__(3),
  Popover = __webpack_require__(13),

  // VERSION = '0.0.1',

  /*
   *
   * @param {[HTMLElement]} tds  - array of HTML elements
   * @param {Bool} updateState - optional
   */
  highlightRows = function(tds, updateState) {

    if (! tds || tds.count === 0) {
      return;
    }

    let
    i = 0;

    const
    current = RMR.Array.coerce(document.querySelectorAll('pre tr.highlighted')),
    pre = RMR.Node.ancestor(tds[0], 'pre');

    for (i = 0; i < current.length; i++) {
      current[i].classList.remove('highlighted');
    }

    if (! tds || ! tds.length) {
      if (updateState) {
        document.location.hash = '';
      }
      return;
    }

    for (i = 0; i < tds.length; i++) {
      if (! tds[i]) {
        continue;
      }
      RMR.Node.ancestor(tds[i], 'tr', true).classList.add('highlighted');
    }

    if (updateState) {
      document.location = '#man-' + pre.getAttribute('id') + '-' + tds[0].getAttribute('data-line-number');
    } else {
      tds[0].scrollIntoView(true);
    }
  },

  /*
   * Initialize page state/interactions
   *
   * @param {object} man - optional config
   */
  init = function(man) {

    const
    matches = document.location.hash.match(/#man-([^\d]*)-(\d*)-?(\d*)?/),
    pres = man.pre ? RMR.Array.coerce(document.body.querySelectorAll('pre')) : [],
    footnotes = man.footnotes ? RMR.Array.coerce(document.body.querySelectorAll('sup a.footnote')) : [],
//    tables = man.table ? RMR.Array.coerce(document.body.querySelectorAll('table')) : [],
    badge = RMR.Node.make('div', { 'class': 'man-badge' });

    let
    i = 0,
    j = 0,
    id,
    buf = '',
    pre,
//    table,
    lines,
//    n,
    node;

    badge.innerHTML = '<a href="http://davidfmiller.github.io/man/" title="Built with man" target="_blank">📘</a>';
    document.body.appendChild(badge);

    for (i = 0; i < footnotes.length; i++) {
      const
      a = footnotes[i],
      target = document.querySelector(a.getAttribute('href').replace(':', '\\:'));

      a.parentNode.setAttribute('title', 'Click to see footnote');

      if (! target) { // footnote content doesn't exist (??)
        continue;
      }

      a.setAttribute('data-popover-footnote', target.id);
    }

    if (footnotes.length) {
      var pop = new Popover({
        root : '#man',
        attribute : 'data-popover-footnote',
        debug: false,
        factory : function(targetNode) {
          return { events: { pop: 'click' }, class: 'man-popover', content: document.querySelector(targetNode.getAttribute('href').replace(':', '\\:')).innerHTML };
        }
      });
    }

/*
    for (i = 0; i < tables.length; i++) {
      table = tables[i];
      table.addEventListener('click', function(e) {
        if (RMR.Node.matches(e.target, 'tbody td, tbody th')) {
//          e.target.classList.add('');
        }
      });
    }
*/

    // open
    const openData = function(/* e */) {
      if (RMR.Browser.opensData()) {
        window.open('data:text/html;charset=UTF-8;base64,' + RMR.Base64.encode('<!DOCTYPE html><html><head><title>' + document.location + '</title><meta charset="utf-8"><style>html{margin:0;padding:0;}body{margin:0;padding:0;font-family:sans-serif;}header{background:#fff;border-bottom:1px solid #ddd;position:fixed;padding:10px;width:100%;}main{padding:30px 5px;}table,td{white-space:pre;}</style><body><header><a href="' + document.location + '">' + document.location + '</a></header><main><pre>' + this.content + '</pre></main></body></html>'));
      } else {
        const modal = new Modal.Modal({ node: this.node });
        modal.show();
      }
    };

    for (i = 0; i < pres.length; i++) {

      pre = pres[i];

      const content = pre.innerHTML;

      lines = pre.innerHTML.split("\n");
      buf = '<div><table><tbody>';

      // ensure node has an attribute
      if (! pre.getAttribute('id')) {
        pre.setAttribute('id', 'pre-man-' + i);
      }

      // if it's really big then don't magnify on hover
      if (lines.length > 10) {
//        pre.classList.add('rmr-no-transform');
      }

      // move contents of <pre> into a <table> if > 1 line...
      if (lines.length > 1 && ! pre.hasAttribute('data-no-lines')) {

        pre.classList.add('rmr-lines');
        for (j = 0; j < lines.length; j++) {

          if (j === lines.length - 1) { // don't include last line if it's empty
            if (lines[j] === "") {
              break;
            }
          }
          id = 'man-' + pre.getAttribute('id') + '-' + (j + 1);
          buf += '<tr><td title="Line #' + (j + 1) + '" id="' + (id) + '-line" class="col" data-line-number="' + (j + 1) + '"></td><td class="code" id="' + (id) + '-code" data-line-number="' + (j + 1) + '">' + lines[j] + '</td></tr>';
        }

        buf += '</tbody></table></div>';
        pre.innerHTML = buf;
      }

      // add hash link
      const a = RMR.Node.make('a', { class: 'rmr-hash', 'aria-hidden': true, href: '#' + pre.getAttribute('id'), title: 'Link' });
      a.innerHTML = '#';
      pre.appendChild(a);

      const title = 'Expand',
      n = RMR.Node.make('i', {title: title, 'aria-hidden': true});
      n.innerHTML = title;
      n.addEventListener('click', openData.bind({node: pre, content: content}));
      pre.appendChild(n);
    }

    document.body.addEventListener('click',function(e) {
      if (e.target.matches('td.col')) {
        highlightRows([e.target], true);
      } else if (e.target.matches('a.rmr-hash')) {
        highlightRows(null, true);
      }
    });

    if (! matches) {
      return;
    }

    lines = [];

    if (! matches[3]) {
      lines = [document.getElementById('man-' + matches[1] + '-' + matches[2] + '-line')];
    } else {
      for (i = parseInt(matches[2]); i <= parseInt(matches[3]); i++) {
        id = 'man-' + matches[1] + '-' + i + '-line';
        node = document.getElementById(id);
        if (node) {
          lines.push(node);
        }
      }
    }

    highlightRows(lines, false);
  };



  /**
   * Initialize the man page
   *
   * @param {object} config - configuration options
   */
  const Man = function(config) {

    const
    defaultConfig = {
      pre: false,
      footnotes: false
    };

    config = RMR.Object.merge(defaultConfig, config ? config : {});
    init(config);
  };

  module.exports = Man;
})();




/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/* global document,window,Element,module,console */


/*
 * modal
 * ©2017 David Miller
 * https://readmeansrun.com
 *
 * modal is licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 *
 */

(() => {

  'use strict';

  const
  // VERSION = '0.0.1',

  RMR = __webpack_require__(0),

  getClipID = __webpack_require__(4),

  MOBILE = RMR.Browser.isTouch(),

  PREFIX = 'rmr-modal-',
  LANG = {
    'close': 'Close'
  },

  localize = function(key, lookup) {
    if (! lookup) {
      lookup = LANG;
    }

    if (LANG.hasOwnProperty(key)) {
      return LANG[key];
    }

    console.warn('No localization for ' + key);
    return key;
  },

  /*
   *
   */
  addCurtains = function(parent) {

    const curtains = RMR.Node.make('div', { class: PREFIX + 'curtains' });
    curtains.innerHTML = RMR.Node.loader();
    parent.appendChild(curtains);

    const rect = RMR.Node.getRect(parent),
    svg = parent.querySelector('svg');

    svg.style.left = (rect.width - 40) / 2  + 'px';
    svg.style.top = (rect.height - 40) / 2  + 'px';
  },

  /**
   * Create a Modal instance
   *
   * @param {Object} options - args
   */
  Modal = function(options) {

    const defaults = {
      autoplay: 1,
      z: 1,
      attrs: {}
    };

    if (options.hasOwnProperty('aspect') && options.hasOwnProperty('size')) {
      throw new Error('Invalid arguments: aspect and size provided. Specify one or the other.');
    }

    this.options = RMR.Object.merge(defaults, options);
    this.bg = null;
    this.container = null;
    this.elements = {
      bg: null,
      container: null
    };
  };

  /**
   * Presents the modal
   *
   * @return {Object} - instance for chaining
   * @chainable
   */
  Modal.prototype.show = function() {
    const self = this;

    const
    dismiss = function() {
      self.remove();
    },
    init = function() {
      self.elements.bg = document.createElement('div');
      self.elements.bg.classList.add(PREFIX + 'bg');
      self.elements.bg.style.zIndex = parseInt(self.options.z, 10);

      document.body.classList.add(PREFIX + 'open');

      self.elements.container = RMR.Node.make('div', { tabindex: -1, role: 'dialog', 'aria-hidden': true });
      self.elements.container.classList.add(PREFIX + 'dialog');
      self.elements.container.style.zIndex = parseInt(self.options.z + 1, 10);

      if (self.options.size) {
        self.elements.container.style.width = self.options.size.width + 'px';
        self.elements.container.style.height = self.options.size.height + 'px';
      }

      document.body.insertBefore(self.elements.bg, document.body.childNodes[0]);

      window.setTimeout(function() {
        self.elements.bg.classList.add(PREFIX + 'focus');
      }, 0);

      document.body.insertBefore(self.elements.container, document.body.childNodes[0]);

      self.keyListener = document.addEventListener('keydown', (e) => {

//        console.log(e.keyCode);

        if (e.keyCode === 27) { // escape key
          self.remove();
        } else if (e.keyCode === 32 && self.options && self.options.video) { // spacebar

          e.preventDefault();

          const video = self.elements.container.querySelector('video');
          if (video) {
            if (video.paused) {
              video.play();
            } else {
              video.pause();
            }
          }
        }
      });

    },
    post = function() {
      if (! self.options) {
        return;
      }

      if (self.options.hasOwnProperty('class')) {
        self.elements.container.classList.add(self.options.class);
      }

      const curtains = self.elements.container.querySelector('.' + PREFIX + 'curtains');
      window.setTimeout(function() { if (curtains && curtains.parentNode) { curtains.parentNode.removeChild(curtains); } }, 200);


      const but = RMR.Node.make('button', { class: PREFIX + 'dismiss', title: localize('close')} );
      but.innerHTML = localize('close');
      self.elements.container.appendChild(but);
      but.addEventListener('click', dismiss);
      but.focus();

      const resizer = function() {

        if (! self || ! self.options) {
          return;
        }

        let resize = false;

        const
        aspect = self.options.hasOwnProperty('aspect') ? self.options.aspect : self.options.hasOwnProperty('size') ? self.options.size.width / self.options.size.height : 0,
        buffer = MOBILE ? 0 : 0.20, // portion of window that should be padding around modal
        modalSize = { width: 0, height: 0},
        windowSize = { width: window.innerWidth, height: window.innerHeight },
        verticalLimiter = (window.innerWidth / window.innerHeight) > aspect ? true : false;

        // set size via aspect ratio that fits in browser window
        if (self.options.hasOwnProperty('aspect')) {
          resize = true;
          if (verticalLimiter) {
            modalSize.height = (windowSize.height - windowSize.height * buffer);
            modalSize.width = modalSize.height * aspect;
          } else {
            modalSize.width = (windowSize.width - windowSize.width * buffer);
            modalSize.height = modalSize.width / aspect;
          }

        // set size via options parameters
        } else if (self.options.hasOwnProperty('size')) {
          resize = true;
          modalSize.width = self.options.size.width;
          modalSize.height = self.options.size.height;
        } else {

          const section = self.elements.container.querySelector('section.' + PREFIX + 'section');
          if (section) {
            section.style.maxHeight = parseInt(window.getComputedStyle(self.elements.container).height, 10)  + 'px';
          }

        }
        // undefined sizing behaviour

        if (resize) {
          self.elements.container.style.right = '';
          self.elements.container.style.width = modalSize.width + 'px';
          self.elements.container.style.height = modalSize.height + 'px';
          self.elements.container.style.left = (windowSize.width - modalSize.width) / 2 + 'px';
          self.elements.container.style.top = (windowSize.height - modalSize.height) / 2 + 'px';

          // position svg loader
          const svg = self.elements.container.querySelector('svg');
          if (svg) {
            svg.style.left = (modalSize.width - 40) / 2  + 'px';
            svg.style.top = (modalSize.height - 40) / 2  + 'px';
          }
        }

//        console.log('resize');
      };

      resizer();
//      if (self.options.hasOwnProperty('size') || self.options.hasOwnProperty('aspect')) {
        self.resizeListener = window.addEventListener('resize', resizer);
//      }

      document.body.classList.add(PREFIX + 'open');
      if (self.options.hasOwnProperty('class')) {
        self.elements.container.classList.add(self.options.class);
      }

      self.elements.bg.addEventListener('click', dismiss);
      window.setTimeout(() => {
        if (! self) {
          return;
        }
        if (self.elements.container) {
          self.elements.container.classList.add(PREFIX + 'focus');
          if (MOBILE) {
            self.elements.container.classList.add(PREFIX + 'mobile');
          }
        }
        if (self.elements.bg) {
//          self.elements.bg.classList.add(PREFIX + 'focus');
        }

        if (self.options && self.options.hasOwnProperty('on') && self.options.on.hasOwnProperty('show')) {
          self.options.on.show(self.elements.container, self.options);
        }
      }, 100);

      self.elements.container.appendChild(document.createComment('Created by modal - https://github.com/davidfmiller/modal '));
    };

    if (this.options.url) {

      init();

      self.elements.container.classList.add(PREFIX + 'loading');

      addCurtains(self.elements.container);

      self.elements.container.querySelector('svg').addEventListener('click', () => {
        self.remove();
      });

      const xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {

        if (this.readyState === 4) {
          if (this.status === 200) {
            if (self.elements.container) {
              self.elements.container.classList.add(PREFIX + 'node');
              self.elements.container.classList.remove(PREFIX + 'loading');
              self.elements.container.innerHTML = '<section class="' + PREFIX + 'section">' + this.responseText + '</section>';
              post();
            }
          } else {
// TODO
          }
        }
      };

      window.setTimeout(function () {
        if (self.options) {
          xhttp.open(self.options.hasOwnProperty('method') ? self.options.method : 'get', self.options.url, true);
          xhttp.send();
        }
      }, 200);

    } else if (this.options.image) {

      init();

      self.elements.container.classList.add(PREFIX + 'loading');

      const image = RMR.Node.make('img', this.options.attrs);

      addCurtains(self.elements.container);

      image.onload = () => {
        self.elements.container.classList.remove(PREFIX + 'loading');
        post();
      };

      window.setTimeout(function() {
        image.srcset = self.options.image;
        post();
      }, 500);

      self.elements.container.appendChild(image);


    } else if (this.options.video) {

      init();

      self.elements.container.classList.add(PREFIX + 'loading');

      const video = RMR.Node.make('video', this.options.attrs);
      video.setAttribute('tabindex', -1);
      for (const i in this.options.video) {
        if (this.options.video.hasOwnProperty(i)) {
          const source = RMR.Node.make('source', { type: i, src: this.options.video[i] });
          video.appendChild(source);
        }
      }

      addCurtains(self.elements.container);

      video.addEventListener('loadeddata', () => {
//        video.focus();
        window.setTimeout(function() {
          self.elements.container.classList.remove(PREFIX + 'loading');
        }, 400);
      });

      self.elements.container.appendChild(video);
      post();

    } else if (this.options.node) {

      init();

      const node = RMR.Node.get(this.options.node);

      if (! node) {
        throw new Error('Invalid node for modal :' + node);
        return;
      }

      self.elements.container.classList.add(PREFIX + 'node');

      self.elements.container.innerHTML = '<section class="' + PREFIX + 'section"></section>';
      self.elements.container.querySelector('section').appendChild(node.cloneNode(true));
      post();

    } else if (this.options.html) {

      init();
      self.elements.container.classList.add(PREFIX + 'node');
      self.elements.container.innerHTML = '<section class="' + PREFIX + 'section">' + this.options.html + '</section>';
      post();

    } else if (this.options.youtube || this.options.vimeo) {

      const clip = getClipID(this.options.youtube ? this.options.youtube : this.options.vimeo);

      init();

      const
      player = this.options.hasOwnProperty('youtube') ? 'https://www.youtube.com/embed/' : 'https://player.vimeo.com/video/',
      iframe = '<iframe src="' + player + (clip ? clip : '')  + (this.options.autoplay ? '?autoplay=1' : '') + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';

      self.elements.container.classList.add(PREFIX + 'video');
      self.elements.container.innerHTML = iframe;
      post();

    } else {
      throw new Error('Invalid modal parameters: ' + JSON.stringify(this.options));
      return;
    }

    return this;
  };

  /**
   * Remove the modal
   *
   * @return {Object} - instance for chaining
   * @chainable
   */
  Modal.prototype.remove = function() {
    const self = this;

    document.body.classList.remove(PREFIX + 'open');

    if (self.elements.container) {
      self.elements.container.classList.remove(PREFIX + 'focus');
    }
    if (self.elements.bg) {
      self.elements.bg.classList.add(PREFIX + 'dismiss');
    }

    document.body.classList.remove(PREFIX + 'open');

    if (self.options && self.options.hasOwnProperty('on') && self.options.on.hasOwnProperty('remove')) {
      self.options.on.remove(self.elements.container, self.options);
    }

    window.setTimeout(
      function timeout() {
        if (! self) {
          return;
        }

        if (self.elements.bg) {
          document.body.removeChild(self.elements.bg);
        }
        if (self.elements.container) {
          document.body.removeChild(self.elements.container);
        }
        self.resizeListener = self.keyListener = self.options = null;
        self.elements = { container: null, bg: null };
      }, 200
    );

    window.removeEventListener('resize', self.resizeListener);
    document.removeEventListener('keydown', self.keyListener);

    return this;
  };

  module.exports = {
    Modal: Modal,
    clip: getClipID
  };

})();


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/* */

(() => {

  'use strict';

  const URL = typeof window !== 'undefined' ? window.URL : __webpack_require__(5).URL,

  RMR = __webpack_require__(0),

  /**
   * Parse a YouTube or Vimeo URL and retrieve the video/clip ID 
   *
   * @param {String} url the URL to be parsed
   * @return {String} the clip id
   */
  getClipID = function(url) {

    // ensure it's a string
    url = '' + url;

    if (url.substring(0, '5') !== 'http:' && url.substring(0, '8') !== 'https://' && url.substring(0, 2) !== '//') {
      return url;
    }

    // unsupported (older versions of internet explorer)
    if (typeof URL === 'undefined') {
      return null;
    }

    const
    o = new URL(url),
    params = o.searchParams;

    if (o.hostname.indexOf('youtube.com') !== -1) {
      if (params.get('v')) {
        return params.get('v');
      }

      const paths = o.pathname.split('/');
      return RMR.Array.last(paths);

    } else if (o.hostname.indexOf('vimeo.com') !== -1) {

      if (o.hostname.indexOf('player.vimeo.com') !== -1) {
        return RMR.Array.last(o.pathname.split('/'))
      }

      const id = RMR.Array.last(o.pathname.split('/'));
      if (parseInt(id, 10)) {
        return id;
      }

      return null;
    }

    return url;
  };

  module.exports = getClipID;

})();


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var punycode = __webpack_require__(6);
var util = __webpack_require__(9);

exports.parse = urlParse;
exports.resolve = urlResolve;
exports.resolveObject = urlResolveObject;
exports.format = urlFormat;

exports.Url = Url;

function Url() {
  this.protocol = null;
  this.slashes = null;
  this.auth = null;
  this.host = null;
  this.port = null;
  this.hostname = null;
  this.hash = null;
  this.search = null;
  this.query = null;
  this.pathname = null;
  this.path = null;
  this.href = null;
}

// Reference: RFC 3986, RFC 1808, RFC 2396

// define these here so at least they only have to be
// compiled once on the first module load.
var protocolPattern = /^([a-z0-9.+-]+:)/i,
    portPattern = /:[0-9]*$/,

    // Special case for a simple path URL
    simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,

    // RFC 2396: characters reserved for delimiting URLs.
    // We actually just auto-escape these.
    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

    // RFC 2396: characters not allowed for various reasons.
    unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),

    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
    autoEscape = ['\''].concat(unwise),
    // Characters that are never ever allowed in a hostname.
    // Note that any invalid chars are also handled, but these
    // are the ones that are *expected* to be seen, so we fast-path
    // them.
    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
    hostEndingChars = ['/', '?', '#'],
    hostnameMaxLen = 255,
    hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
    hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
    // protocols that can allow "unsafe" and "unwise" chars.
    unsafeProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that never have a hostname.
    hostlessProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that always contain a // bit.
    slashedProtocol = {
      'http': true,
      'https': true,
      'ftp': true,
      'gopher': true,
      'file': true,
      'http:': true,
      'https:': true,
      'ftp:': true,
      'gopher:': true,
      'file:': true
    },
    querystring = __webpack_require__(10);

function urlParse(url, parseQueryString, slashesDenoteHost) {
  if (url && util.isObject(url) && url instanceof Url) return url;

  var u = new Url;
  u.parse(url, parseQueryString, slashesDenoteHost);
  return u;
}

Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
  if (!util.isString(url)) {
    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
  }

  // Copy chrome, IE, opera backslash-handling behavior.
  // Back slashes before the query string get converted to forward slashes
  // See: https://code.google.com/p/chromium/issues/detail?id=25916
  var queryIndex = url.indexOf('?'),
      splitter =
          (queryIndex !== -1 && queryIndex < url.indexOf('#')) ? '?' : '#',
      uSplit = url.split(splitter),
      slashRegex = /\\/g;
  uSplit[0] = uSplit[0].replace(slashRegex, '/');
  url = uSplit.join(splitter);

  var rest = url;

  // trim before proceeding.
  // This is to support parse stuff like "  http://foo.com  \n"
  rest = rest.trim();

  if (!slashesDenoteHost && url.split('#').length === 1) {
    // Try fast path regexp
    var simplePath = simplePathPattern.exec(rest);
    if (simplePath) {
      this.path = rest;
      this.href = rest;
      this.pathname = simplePath[1];
      if (simplePath[2]) {
        this.search = simplePath[2];
        if (parseQueryString) {
          this.query = querystring.parse(this.search.substr(1));
        } else {
          this.query = this.search.substr(1);
        }
      } else if (parseQueryString) {
        this.search = '';
        this.query = {};
      }
      return this;
    }
  }

  var proto = protocolPattern.exec(rest);
  if (proto) {
    proto = proto[0];
    var lowerProto = proto.toLowerCase();
    this.protocol = lowerProto;
    rest = rest.substr(proto.length);
  }

  // figure out if it's got a host
  // user@server is *always* interpreted as a hostname, and url
  // resolution will treat //foo/bar as host=foo,path=bar because that's
  // how the browser resolves relative URLs.
  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    var slashes = rest.substr(0, 2) === '//';
    if (slashes && !(proto && hostlessProtocol[proto])) {
      rest = rest.substr(2);
      this.slashes = true;
    }
  }

  if (!hostlessProtocol[proto] &&
      (slashes || (proto && !slashedProtocol[proto]))) {

    // there's a hostname.
    // the first instance of /, ?, ;, or # ends the host.
    //
    // If there is an @ in the hostname, then non-host chars *are* allowed
    // to the left of the last @ sign, unless some host-ending character
    // comes *before* the @-sign.
    // URLs are obnoxious.
    //
    // ex:
    // http://a@b@c/ => user:a@b host:c
    // http://a@b?@c => user:a host:c path:/?@c

    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
    // Review our test case against browsers more comprehensively.

    // find the first instance of any hostEndingChars
    var hostEnd = -1;
    for (var i = 0; i < hostEndingChars.length; i++) {
      var hec = rest.indexOf(hostEndingChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }

    // at this point, either we have an explicit point where the
    // auth portion cannot go past, or the last @ char is the decider.
    var auth, atSign;
    if (hostEnd === -1) {
      // atSign can be anywhere.
      atSign = rest.lastIndexOf('@');
    } else {
      // atSign must be in auth portion.
      // http://a@b/c@d => host:b auth:a path:/c@d
      atSign = rest.lastIndexOf('@', hostEnd);
    }

    // Now we have a portion which is definitely the auth.
    // Pull that off.
    if (atSign !== -1) {
      auth = rest.slice(0, atSign);
      rest = rest.slice(atSign + 1);
      this.auth = decodeURIComponent(auth);
    }

    // the host is the remaining to the left of the first non-host char
    hostEnd = -1;
    for (var i = 0; i < nonHostChars.length; i++) {
      var hec = rest.indexOf(nonHostChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }
    // if we still have not hit it, then the entire thing is a host.
    if (hostEnd === -1)
      hostEnd = rest.length;

    this.host = rest.slice(0, hostEnd);
    rest = rest.slice(hostEnd);

    // pull out port.
    this.parseHost();

    // we've indicated that there is a hostname,
    // so even if it's empty, it has to be present.
    this.hostname = this.hostname || '';

    // if hostname begins with [ and ends with ]
    // assume that it's an IPv6 address.
    var ipv6Hostname = this.hostname[0] === '[' &&
        this.hostname[this.hostname.length - 1] === ']';

    // validate a little.
    if (!ipv6Hostname) {
      var hostparts = this.hostname.split(/\./);
      for (var i = 0, l = hostparts.length; i < l; i++) {
        var part = hostparts[i];
        if (!part) continue;
        if (!part.match(hostnamePartPattern)) {
          var newpart = '';
          for (var j = 0, k = part.length; j < k; j++) {
            if (part.charCodeAt(j) > 127) {
              // we replace non-ASCII char with a temporary placeholder
              // we need this to make sure size of hostname is not
              // broken by replacing non-ASCII by nothing
              newpart += 'x';
            } else {
              newpart += part[j];
            }
          }
          // we test again with ASCII char only
          if (!newpart.match(hostnamePartPattern)) {
            var validParts = hostparts.slice(0, i);
            var notHost = hostparts.slice(i + 1);
            var bit = part.match(hostnamePartStart);
            if (bit) {
              validParts.push(bit[1]);
              notHost.unshift(bit[2]);
            }
            if (notHost.length) {
              rest = '/' + notHost.join('.') + rest;
            }
            this.hostname = validParts.join('.');
            break;
          }
        }
      }
    }

    if (this.hostname.length > hostnameMaxLen) {
      this.hostname = '';
    } else {
      // hostnames are always lower case.
      this.hostname = this.hostname.toLowerCase();
    }

    if (!ipv6Hostname) {
      // IDNA Support: Returns a punycoded representation of "domain".
      // It only converts parts of the domain name that
      // have non-ASCII characters, i.e. it doesn't matter if
      // you call it with a domain that already is ASCII-only.
      this.hostname = punycode.toASCII(this.hostname);
    }

    var p = this.port ? ':' + this.port : '';
    var h = this.hostname || '';
    this.host = h + p;
    this.href += this.host;

    // strip [ and ] from the hostname
    // the host field still retains them, though
    if (ipv6Hostname) {
      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
      if (rest[0] !== '/') {
        rest = '/' + rest;
      }
    }
  }

  // now rest is set to the post-host stuff.
  // chop off any delim chars.
  if (!unsafeProtocol[lowerProto]) {

    // First, make 100% sure that any "autoEscape" chars get
    // escaped, even if encodeURIComponent doesn't think they
    // need to be.
    for (var i = 0, l = autoEscape.length; i < l; i++) {
      var ae = autoEscape[i];
      if (rest.indexOf(ae) === -1)
        continue;
      var esc = encodeURIComponent(ae);
      if (esc === ae) {
        esc = escape(ae);
      }
      rest = rest.split(ae).join(esc);
    }
  }


  // chop off from the tail first.
  var hash = rest.indexOf('#');
  if (hash !== -1) {
    // got a fragment string.
    this.hash = rest.substr(hash);
    rest = rest.slice(0, hash);
  }
  var qm = rest.indexOf('?');
  if (qm !== -1) {
    this.search = rest.substr(qm);
    this.query = rest.substr(qm + 1);
    if (parseQueryString) {
      this.query = querystring.parse(this.query);
    }
    rest = rest.slice(0, qm);
  } else if (parseQueryString) {
    // no query string, but parseQueryString still requested
    this.search = '';
    this.query = {};
  }
  if (rest) this.pathname = rest;
  if (slashedProtocol[lowerProto] &&
      this.hostname && !this.pathname) {
    this.pathname = '/';
  }

  //to support http.request
  if (this.pathname || this.search) {
    var p = this.pathname || '';
    var s = this.search || '';
    this.path = p + s;
  }

  // finally, reconstruct the href based on what has been validated.
  this.href = this.format();
  return this;
};

// format a parsed object into a url string
function urlFormat(obj) {
  // ensure it's an object, and not a string url.
  // If it's an obj, this is a no-op.
  // this way, you can call url_format() on strings
  // to clean up potentially wonky urls.
  if (util.isString(obj)) obj = urlParse(obj);
  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
  return obj.format();
}

Url.prototype.format = function() {
  var auth = this.auth || '';
  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ':');
    auth += '@';
  }

  var protocol = this.protocol || '',
      pathname = this.pathname || '',
      hash = this.hash || '',
      host = false,
      query = '';

  if (this.host) {
    host = auth + this.host;
  } else if (this.hostname) {
    host = auth + (this.hostname.indexOf(':') === -1 ?
        this.hostname :
        '[' + this.hostname + ']');
    if (this.port) {
      host += ':' + this.port;
    }
  }

  if (this.query &&
      util.isObject(this.query) &&
      Object.keys(this.query).length) {
    query = querystring.stringify(this.query);
  }

  var search = this.search || (query && ('?' + query)) || '';

  if (protocol && protocol.substr(-1) !== ':') protocol += ':';

  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
  // unless they had them to begin with.
  if (this.slashes ||
      (!protocol || slashedProtocol[protocol]) && host !== false) {
    host = '//' + (host || '');
    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
  } else if (!host) {
    host = '';
  }

  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
  if (search && search.charAt(0) !== '?') search = '?' + search;

  pathname = pathname.replace(/[?#]/g, function(match) {
    return encodeURIComponent(match);
  });
  search = search.replace('#', '%23');

  return protocol + host + pathname + search + hash;
};

function urlResolve(source, relative) {
  return urlParse(source, false, true).resolve(relative);
}

Url.prototype.resolve = function(relative) {
  return this.resolveObject(urlParse(relative, false, true)).format();
};

function urlResolveObject(source, relative) {
  if (!source) return relative;
  return urlParse(source, false, true).resolveObject(relative);
}

Url.prototype.resolveObject = function(relative) {
  if (util.isString(relative)) {
    var rel = new Url();
    rel.parse(relative, false, true);
    relative = rel;
  }

  var result = new Url();
  var tkeys = Object.keys(this);
  for (var tk = 0; tk < tkeys.length; tk++) {
    var tkey = tkeys[tk];
    result[tkey] = this[tkey];
  }

  // hash is always overridden, no matter what.
  // even href="" will remove it.
  result.hash = relative.hash;

  // if the relative url is empty, then there's nothing left to do here.
  if (relative.href === '') {
    result.href = result.format();
    return result;
  }

  // hrefs like //foo/bar always cut to the protocol.
  if (relative.slashes && !relative.protocol) {
    // take everything except the protocol from relative
    var rkeys = Object.keys(relative);
    for (var rk = 0; rk < rkeys.length; rk++) {
      var rkey = rkeys[rk];
      if (rkey !== 'protocol')
        result[rkey] = relative[rkey];
    }

    //urlParse appends trailing / to urls like http://www.example.com
    if (slashedProtocol[result.protocol] &&
        result.hostname && !result.pathname) {
      result.path = result.pathname = '/';
    }

    result.href = result.format();
    return result;
  }

  if (relative.protocol && relative.protocol !== result.protocol) {
    // if it's a known url protocol, then changing
    // the protocol does weird things
    // first, if it's not file:, then we MUST have a host,
    // and if there was a path
    // to begin with, then we MUST have a path.
    // if it is file:, then the host is dropped,
    // because that's known to be hostless.
    // anything else is assumed to be absolute.
    if (!slashedProtocol[relative.protocol]) {
      var keys = Object.keys(relative);
      for (var v = 0; v < keys.length; v++) {
        var k = keys[v];
        result[k] = relative[k];
      }
      result.href = result.format();
      return result;
    }

    result.protocol = relative.protocol;
    if (!relative.host && !hostlessProtocol[relative.protocol]) {
      var relPath = (relative.pathname || '').split('/');
      while (relPath.length && !(relative.host = relPath.shift()));
      if (!relative.host) relative.host = '';
      if (!relative.hostname) relative.hostname = '';
      if (relPath[0] !== '') relPath.unshift('');
      if (relPath.length < 2) relPath.unshift('');
      result.pathname = relPath.join('/');
    } else {
      result.pathname = relative.pathname;
    }
    result.search = relative.search;
    result.query = relative.query;
    result.host = relative.host || '';
    result.auth = relative.auth;
    result.hostname = relative.hostname || relative.host;
    result.port = relative.port;
    // to support http.request
    if (result.pathname || result.search) {
      var p = result.pathname || '';
      var s = result.search || '';
      result.path = p + s;
    }
    result.slashes = result.slashes || relative.slashes;
    result.href = result.format();
    return result;
  }

  var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
      isRelAbs = (
          relative.host ||
          relative.pathname && relative.pathname.charAt(0) === '/'
      ),
      mustEndAbs = (isRelAbs || isSourceAbs ||
                    (result.host && relative.pathname)),
      removeAllDots = mustEndAbs,
      srcPath = result.pathname && result.pathname.split('/') || [],
      relPath = relative.pathname && relative.pathname.split('/') || [],
      psychotic = result.protocol && !slashedProtocol[result.protocol];

  // if the url is a non-slashed url, then relative
  // links like ../.. should be able
  // to crawl up to the hostname, as well.  This is strange.
  // result.protocol has already been set by now.
  // Later on, put the first path part into the host field.
  if (psychotic) {
    result.hostname = '';
    result.port = null;
    if (result.host) {
      if (srcPath[0] === '') srcPath[0] = result.host;
      else srcPath.unshift(result.host);
    }
    result.host = '';
    if (relative.protocol) {
      relative.hostname = null;
      relative.port = null;
      if (relative.host) {
        if (relPath[0] === '') relPath[0] = relative.host;
        else relPath.unshift(relative.host);
      }
      relative.host = null;
    }
    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
  }

  if (isRelAbs) {
    // it's absolute.
    result.host = (relative.host || relative.host === '') ?
                  relative.host : result.host;
    result.hostname = (relative.hostname || relative.hostname === '') ?
                      relative.hostname : result.hostname;
    result.search = relative.search;
    result.query = relative.query;
    srcPath = relPath;
    // fall through to the dot-handling below.
  } else if (relPath.length) {
    // it's relative
    // throw away the existing file, and take the new path instead.
    if (!srcPath) srcPath = [];
    srcPath.pop();
    srcPath = srcPath.concat(relPath);
    result.search = relative.search;
    result.query = relative.query;
  } else if (!util.isNullOrUndefined(relative.search)) {
    // just pull out the search.
    // like href='?foo'.
    // Put this after the other two cases because it simplifies the booleans
    if (psychotic) {
      result.hostname = result.host = srcPath.shift();
      //occationaly the auth can get stuck only in host
      //this especially happens in cases like
      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
      var authInHost = result.host && result.host.indexOf('@') > 0 ?
                       result.host.split('@') : false;
      if (authInHost) {
        result.auth = authInHost.shift();
        result.host = result.hostname = authInHost.shift();
      }
    }
    result.search = relative.search;
    result.query = relative.query;
    //to support http.request
    if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
      result.path = (result.pathname ? result.pathname : '') +
                    (result.search ? result.search : '');
    }
    result.href = result.format();
    return result;
  }

  if (!srcPath.length) {
    // no path at all.  easy.
    // we've already handled the other stuff above.
    result.pathname = null;
    //to support http.request
    if (result.search) {
      result.path = '/' + result.search;
    } else {
      result.path = null;
    }
    result.href = result.format();
    return result;
  }

  // if a url ENDs in . or .., then it must get a trailing slash.
  // however, if it ends in anything else non-slashy,
  // then it must NOT get a trailing slash.
  var last = srcPath.slice(-1)[0];
  var hasTrailingSlash = (
      (result.host || relative.host || srcPath.length > 1) &&
      (last === '.' || last === '..') || last === '');

  // strip single dots, resolve double dots to parent dir
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = srcPath.length; i >= 0; i--) {
    last = srcPath[i];
    if (last === '.') {
      srcPath.splice(i, 1);
    } else if (last === '..') {
      srcPath.splice(i, 1);
      up++;
    } else if (up) {
      srcPath.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (!mustEndAbs && !removeAllDots) {
    for (; up--; up) {
      srcPath.unshift('..');
    }
  }

  if (mustEndAbs && srcPath[0] !== '' &&
      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
    srcPath.unshift('');
  }

  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
    srcPath.push('');
  }

  var isAbsolute = srcPath[0] === '' ||
      (srcPath[0] && srcPath[0].charAt(0) === '/');

  // put the host back
  if (psychotic) {
    result.hostname = result.host = isAbsolute ? '' :
                                    srcPath.length ? srcPath.shift() : '';
    //occationaly the auth can get stuck only in host
    //this especially happens in cases like
    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
    var authInHost = result.host && result.host.indexOf('@') > 0 ?
                     result.host.split('@') : false;
    if (authInHost) {
      result.auth = authInHost.shift();
      result.host = result.hostname = authInHost.shift();
    }
  }

  mustEndAbs = mustEndAbs || (result.host && srcPath.length);

  if (mustEndAbs && !isAbsolute) {
    srcPath.unshift('');
  }

  if (!srcPath.length) {
    result.pathname = null;
    result.path = null;
  } else {
    result.pathname = srcPath.join('/');
  }

  //to support request.http
  if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
    result.path = (result.pathname ? result.pathname : '') +
                  (result.search ? result.search : '');
  }
  result.auth = relative.auth || result.auth;
  result.slashes = result.slashes || relative.slashes;
  result.href = result.format();
  return result;
};

Url.prototype.parseHost = function() {
  var host = this.host;
  var port = portPattern.exec(host);
  if (port) {
    port = port[0];
    if (port !== ':') {
      this.port = port.substr(1);
    }
    host = host.substr(0, host.length - port.length);
  }
  if (host) this.hostname = host;
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/punycode v1.4.1 by @mathias */
;(function(root) {

	/** Detect free variables */
	var freeExports = typeof exports == 'object' && exports &&
		!exports.nodeType && exports;
	var freeModule = typeof module == 'object' && module &&
		!module.nodeType && module;
	var freeGlobal = typeof global == 'object' && global;
	if (
		freeGlobal.global === freeGlobal ||
		freeGlobal.window === freeGlobal ||
		freeGlobal.self === freeGlobal
	) {
		root = freeGlobal;
	}

	/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */
	var punycode,

	/** Highest positive signed 32-bit float value */
	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	base = 36,
	tMin = 1,
	tMax = 26,
	skew = 38,
	damp = 700,
	initialBias = 72,
	initialN = 128, // 0x80
	delimiter = '-', // '\x2D'

	/** Regular expressions */
	regexPunycode = /^xn--/,
	regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
	regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

	/** Error messages */
	errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	},

	/** Convenience shortcuts */
	baseMinusTMin = base - tMin,
	floor = Math.floor,
	stringFromCharCode = String.fromCharCode,

	/** Temporary variable */
	key;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw new RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		var length = array.length;
		var result = [];
		while (length--) {
			result[length] = fn(array[length]);
		}
		return result;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		var parts = string.split('@');
		var result = '';
		if (parts.length > 1) {
			// In email addresses, only the domain name should be punycoded. Leave
			// the local part (i.e. everything up to `@`) intact.
			result = parts[0] + '@';
			string = parts[1];
		}
		// Avoid `split(regex)` for IE8 compatibility. See #17.
		string = string.replace(regexSeparators, '\x2E');
		var labels = string.split('.');
		var encoded = map(labels, fn).join('.');
		return result + encoded;
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		var output = [],
		    counter = 0,
		    length = string.length,
		    value,
		    extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	function ucs2encode(array) {
		return map(array, function(value) {
			var output = '';
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
			return output;
		}).join('');
	}

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	function basicToDigit(codePoint) {
		if (codePoint - 48 < 10) {
			return codePoint - 22;
		}
		if (codePoint - 65 < 26) {
			return codePoint - 65;
		}
		if (codePoint - 97 < 26) {
			return codePoint - 97;
		}
		return base;
	}

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	function digitToBasic(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * https://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	function adapt(delta, numPoints, firstTime) {
		var k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	function decode(input) {
		// Don't use UCS-2
		var output = [],
		    inputLength = input.length,
		    out,
		    i = 0,
		    n = initialN,
		    bias = initialBias,
		    basic,
		    j,
		    index,
		    oldi,
		    w,
		    k,
		    digit,
		    t,
		    /** Cached calculation results */
		    baseMinusT;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

				if (digit < t) {
					break;
				}

				baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}

				w *= baseMinusT;

			}

			out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output
			output.splice(i++, 0, n);

		}

		return ucs2encode(output);
	}

	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	function encode(input) {
		var n,
		    delta,
		    handledCPCount,
		    basicLength,
		    bias,
		    j,
		    m,
		    q,
		    k,
		    t,
		    currentValue,
		    output = [],
		    /** `inputLength` will hold the number of code points in `input`. */
		    inputLength,
		    /** Cached calculation results */
		    handledCPCountPlusOne,
		    baseMinusT,
		    qMinusT;

		// Convert the input in UCS-2 to Unicode
		input = ucs2decode(input);

		// Cache the length
		inputLength = input.length;

		// Initialize the state
		n = initialN;
		delta = 0;
		bias = initialBias;

		// Handle the basic code points
		for (j = 0; j < inputLength; ++j) {
			currentValue = input[j];
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		handledCPCount = basicLength = output.length;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string - if it is not empty - with a delimiter
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			for (m = maxInt, j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow
			handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];

				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}

				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer
					for (q = delta, k = base; /* no condition */; k += base) {
						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						qMinusT = q - t;
						baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}

			++delta;
			++n;

		}
		return output.join('');
	}

	/**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	function toUnicode(input) {
		return mapDomain(input, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	}

	/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */
	function toASCII(input) {
		return mapDomain(input, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	}

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '1.4.1',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};

	/** Expose `punycode` */
	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		true
	) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
			return punycode;
		}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (freeExports && freeModule) {
		if (module.exports == freeExports) {
			// in Node.js, io.js, or RingoJS v0.8.0+
			freeModule.exports = punycode;
		} else {
			// in Narwhal or RingoJS v0.7.0-
			for (key in punycode) {
				punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
			}
		}
	} else {
		// in Rhino or a web browser
		root.punycode = punycode;
	}

}(this));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)(module), __webpack_require__(8)))

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 8 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  isString: function(arg) {
    return typeof(arg) === 'string';
  },
  isObject: function(arg) {
    return typeof(arg) === 'object' && arg !== null;
  },
  isNull: function(arg) {
    return arg === null;
  },
  isNullOrUndefined: function(arg) {
    return arg == null;
  }
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.decode = exports.parse = __webpack_require__(11);
exports.encode = exports.stringify = __webpack_require__(12);


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

/* jshint undef: true,strict:true,trailing:true,loopfunc:true */
/* global document,window,Element,module */

(() => {
  'use strict';

  const

  RMR = __webpack_require__(0),

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


/***/ })
/******/ ]);