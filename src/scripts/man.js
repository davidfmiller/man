

(function() {

  const Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}

  'use strict';

  const

  RMR = require('rmr-util'),
  Fullscreen = require('./fullscreen'),
  Modal = require('./modal'),

  // VERSION = '0.0.1',

  /*
   *
   * @param {[HTMLElement]} tds  - array of HTML elements
   * @param {Bool} updateState - optional
   */
  highlightRows = function(tds, updateState) {

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
    tables = man.table ? RMR.Array.coerce(document.body.querySelectorAll('table')) : [],
    badge = RMR.Node.make('div', { 'class': 'man-badge' });

    let
    i = 0,
    j = 0,
    id,
    buf = '',
    pre,
    table,
    lines,
//    n,
    node;

    badge.innerHTML = '<a href="http://davidfmiller.github.io/man/" title="Built with man" target="_blank">📘</a>';
    document.body.appendChild(badge);

    // currently the only flag
    if (pres.length === 0 && tables.length === 0) {
      return;
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

    for (i = 0; i < pres.length; i++) {

      pre = pres[i];

      const content = pre.innerHTML;

      lines = pre.innerHTML.split("\n");
      buf = '<div><table><tbody>';

      if (! pre.getAttribute('id')) {
        pre.setAttribute('id', 'pre-man-' + i);
      }

      if (lines.length > 10) {
        pre.classList.add('rmr-no-transform');
      }

      if (lines.length <= 1 || pre.hasAttribute('data-no-lines')) {
        continue;
      }

      pre.classList.add('rmr-lines');

      for (j = 0; j < lines.length; j++) {

        // don't include last line if it's empty
        if (j === lines.length - 1) {
          if (lines[j] === "") {
            break;
          }
        }

        id = 'man-' + pre.getAttribute('id') + '-' + (j + 1);
        buf += '<tr><td title="Line #' + (j + 1) + '" id="' + (id) + '-line" class="col" data-line-number="' + (j + 1) + '"></td><td class="code" id="' + (id) + '-code" data-line-number="' + (j + 1) + '">' + lines[j] + '</td></tr>';
      }

      buf += '</tbody></table></div>';
      pre.innerHTML = buf;

      if (pre.classList.contains('rmr-modal')) {

        const title = 'Expand',
        n = RMR.Node.make('i', { title: title});

        n.innerHTML = title;
        n.addEventListener('click', () => {
          if (RMR.Browser.opensData()) {
            window.open('data:text/html;charset=UTF-8;base64,' + Base64.encode('<style>table,td{white-space:pre;}</style><pre>' + pre.innerHTML + '</pre>'));
          } else {
            const modal = new Modal.Modal({ node : pre });
            modal.show();
          }
        });
        pre.appendChild(n);
      }


    }

    document.body.addEventListener('click',function(e) {
      if (e.target.matches('td.col')) {
        highlightRows([e.target], true);
      } else if (e.target.matches('a.hash')) {
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
    defaultConfig = { pre: false };

    config = RMR.Object.merge(defaultConfig, config ? config : {});
    init(config);
  };

  module.exports = Man;
})();


