/* */

(() => {

  'use strict';

  const URL = typeof window !== 'undefined' ? window.URL : require('url').URL,

  RMR = require('rmr-util'),

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
