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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var man = __webpack_require__(1);
  window.Man = man;
})();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {

  'use strict';

  // prevent duplicate declaration

  if (window.Man) {
    return;
  }

  var

  // VERSION = '0.0.1',

  /*
   * Generate a unique string suitable for id attributes
   *
   * @param basename (String)
   * @return string
  guid = function(basename) {
    return basename + '-' + parseInt(Math.random() * 100, 10) + '-' + parseInt(Math.random() * 1000, 10);
  },
   */

  /*
   * Merge two objects into one, values in b take precedence over values in a
   *
   * @param a {Object}
   * @param b {Object}
    * @return Object
   */
  merge = function merge(a, b) {
    var o = {},
        i;
    for (i in a) {
      if (a.hasOwnProperty(i)) {
        o[i] = a[i];
      }
    }
    if (!b) {
      return o;
    }
    for (i in b) {
      if (b.hasOwnProperty(i)) {
        o[i] = b[i];
      }
    }
    return o;
  },


  /*
   * Convert an array-like thing (ex: NodeList or arguments object) into a proper array
   *
   * @param list (array-like thing)
   * @return Array
   */
  arr = function arr(list) {
    var ret = [],
        i = 0;

    if (!list.length) {
      return ret;
    }

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
  makeElement = function makeElement(type, attrs) {
    var n = document.createElement(type),
        i = null;

    for (i in attrs) {
      n.setAttribute(i, attrs[i]);
    }
    return n;
  },


  /*
   * Retrieve an object containing { top: xx, left: xx, bottom: xx, right: xx, width: xx, height: xx }
   *
   * @param node (DOMNode)
   getRect = function(node) {
     var
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
   */

  /*
   *
   * @param node {HTMLElement}
   * @param styles {Object}
   */
  setStyles = function setStyles(node, styles) {
    for (var i in styles) {
      node.style[i] = styles[i];
    }
  },


  /*
   *
   * @param node {HTMLElement}
   * @param styles {Object}
   */
  selectorMatches = function selectorMatches(node, selector) {

    var p = Element.prototype,
        f = p.matches || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector || function (s) {
      return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
    };

    return f.call(node, selector);
  },


  /*
   *
   * @param node {HTMLElement}
   * @param styles {Object}
   */
  ancestor = function ancestor(node, selector, includeSelf) {

    if (arguments.length === 2) {
      includeSelf = true;
    }

    var n = includeSelf ? node : node.parentNode;

    while (n && !selectorMatches(n, selector)) {
      if (n.parentNode) {
        n = n.parentNode;
      } else {
        break;
      }
    }

    if (selectorMatches(n, selector)) {
      return n;
    }

    return null;
  },


  /*
   *
   * @param {[HTMLElement]} tds  - array of HTML elements
   * @param {Bool} updateState - optional
   */
  highlightRows = function highlightRows(tds, updateState) {

    var i = 0,
        current = arr(document.querySelectorAll('pre tr.highlighted')),
        pre = null;

    for (i = 0; i < current.length; i++) {
      current[i].classList.remove('highlighted');
    }

    if (!tds || !tds.length) {
      if (updateState) {
        document.location.hash = '';
      }
      return;
    }

    for (i = 0; i < tds.length; i++) {
      if (!tds[i]) {
        continue;
      }
      ancestor(tds[i], 'tr', true).classList.add('highlighted');
    }

    pre = ancestor(tds[0], 'pre');
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
  init = function init(man) {

    var matches = document.location.hash.match(/#man-([^\d]*)-(\d*)-?(\d*)?/),
        nodes = arr(document.body.querySelectorAll('pre')),
        badge = makeElement('div', { 'class': 'man-badge' });

    var i = 0,
        j = 0,
        id = void 0,
        buf = '',
        pre = void 0,
        lines = void 0,

    //    n,
    node = void 0;

    badge.innerHTML = '<a href="http://davidfmiller.github.io/man/" title="Built with man" target="_blank">📘</a>';
    document.body.appendChild(badge);

    // currently the only flag
    if (!man.pre) {
      return;
    }

    for (i = 0; i < nodes.length; i++) {

      pre = nodes[i];
      lines = pre.innerHTML.split("\n");
      buf = '<table><tbody>';

      if (!pre.getAttribute('id')) {
        pre.setAttribute('id', 'pre-man-' + i);
      }

      if (lines.length <= 1 || pre.hasAttribute('data-no-lines')) {
        continue;
      }

      pre.classList.add('lines');

      for (j = 0; j < lines.length; j++) {
        id = 'man-' + pre.getAttribute('id') + '-' + (j + 1);
        buf += '<tr><td title="Line #' + (j + 1) + '" id="' + id + '-line" class="col" data-line-number="' + (j + 1) + '"></td><td class="code" id="' + id + '-code" data-line-number="' + (j + 1) + '">' + lines[j] + '</td></tr>';
      }

      buf += '</tbody></table>';
      pre.innerHTML = buf;
    }

    document.body.addEventListener('click', function (e) {
      if (e.target.matches('td.col')) {
        highlightRows([e.target], true);
      } else if (e.target.matches('a.hash')) {
        highlightRows(null, true);
      }
    });

    if (!matches) {
      return;
    }

    lines = [];

    if (!matches[3]) {
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
  var Man = function Man(config) {

    var defaultConfig = {};

    config = merge(defaultConfig, config ? config : {});
    //    document.addEventListener('DOMContentLoaded', function() {
    init(config);
    //    });
  };

  module.exports = Man;
})();

/***/ })
/******/ ]);