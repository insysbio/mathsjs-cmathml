/*global window:true*/
'use strict';

const {jsEnv} = require('../isEnv');

if (jsEnv.isBrowser) {
  window['math'].expression.node.ArrayNode.prototype.toCMathMLNode = function() {
    return _toCMathMLNode.apply(this, arguments);
  };
}

if (jsEnv.isNode) {
  exports.name = 'toCMathMLNode';
  exports.path = 'expression.node.ArrayNode.prototype';
  exports.factory = function() {
    return function() {
      return _toCMathMLNode.apply(this, arguments);
    };
  };
}

function _toCMathMLNode(parentXML) {
  let list = parentXML.ownerDocument.createElementNS('http://www.w3.org/1998/Math/MathML', 'list');
  this.items.forEach((item) => {
    item.toCMathMLNode(list);
  });

  parentXML.appendChild(list);
}
