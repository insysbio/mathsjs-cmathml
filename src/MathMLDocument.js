'use strict';
const {DOMParser} = require('xmldom');
module.exports = class MathMLDocument {
  constructor() {
    return new DOMParser()
      .parseFromString('<math xmlns=\'http://www.w3.org/1998/Math/MathML\'/>', 'text/xml');
  }
};
