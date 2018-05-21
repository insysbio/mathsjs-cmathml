/*global document:true*/
'use strict';
const {DOMParser} = require('xmldom');
const jsEnv = require('browser-or-node');

module.exports = class MathMLDocument {
  constructor() {
    if (jsEnv.isBrowser) {
      return document.implementation
        .createDocument('http://www.w3.org/1998/Math/MathML', 'math');
    }

    if (jsEnv.isNode) {
      return new DOMParser()
        .parseFromString('<math xmlns=\'http://www.w3.org/1998/Math/MathML\'/>', 'text/xml');
    }

  }
};
