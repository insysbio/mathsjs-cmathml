/*global document:true*/
'use strict';

module.exports = class MathMLDocument {
  constructor() {
    return document.implementation
      .createDocument('http://www.w3.org/1998/Math/MathML', 'math');
  }
};
