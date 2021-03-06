

(function() {

  'use strict';

  const

  RMR = require('rmr-util'),
//  Fullscreen = require('./fullscreen'),
  Modal = require('./modal'),
  Popover = require('./popover'),

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
    badge = RMR.Node.create('div', { 'class': 'man-badge' });

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
      const a = RMR.Node.create('a', { class: 'rmr-hash', 'aria-hidden': true, href: '#' + pre.getAttribute('id'), title: 'Link' });
      a.innerHTML = '#';
      pre.appendChild(a);

      const title = 'Expand',
      n = RMR.Node.create('i', {title: title, 'aria-hidden': true});
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


