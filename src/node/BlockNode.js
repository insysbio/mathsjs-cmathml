/*global window:true*/
'use strict';

const {jsEnv} = require('../isEnv');

if (jsEnv.isBrowser) {
  window['math'].expression.node.BlockNode.prototype.toCMathMLNode = function() {
    return _toCMathMLNode.apply(this, arguments);
  };
}

if (jsEnv.isNode) {
  exports.name = 'toCMathMLNode';
  exports.path = 'expression.node.BlockNode.prototype';
  exports.factory = function() {
    return function() {
      return _toCMathMLNode.apply(this, arguments);
    };
  };
}

function _toCMathMLNode(parentXML) {
  let list = parentXML.ownerDocument.createElement('list');
  this.blocks.forEach((item) => {
    item.node.toCMathMLNode(list);
  });

  parentXML.appendChild(list);
}
