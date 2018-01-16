

(function() {

  'use strict';

  const

  RMR = require('rmr-util'),

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
    if (pres.length == 0 && tables.length == 0) {
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
      lines = pre.innerHTML.split("\n");
      buf = '<table><tbody>';

      if (! pre.getAttribute('id')) {
        pre.setAttribute('id', 'pre-man-' + i);
      }

      if (lines.length <= 1 || pre.hasAttribute('data-no-lines')) {
        continue;
      }

      pre.classList.add('lines');

      for (j = 0; j < lines.length; j++) {
        id = 'man-' + pre.getAttribute('id') + '-' + (j + 1);
        buf += '<tr><td title="Line #' + (j + 1) + '" id="' + (id) + '-line" class="col" data-line-number="' + (j + 1) + '"></td><td class="code" id="' + (id) + '-code" data-line-number="' + (j + 1) + '">' + lines[j] + '</td></tr>';
      }

      buf += '</tbody></table>';
      pre.innerHTML = buf;
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


