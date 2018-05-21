/*global window:true*/
'use strict';

const jsEnv = require('browser-or-node');

if (jsEnv.isBrowser) {
  window['math'].expression.node.Node.prototype.toCMathMLNode = function() {
    return _toCMathMLNode.apply(this);
  };
}

if (jsEnv.isNode) {
  exports.name = 'toCMathMLNode';
  exports.path = 'expression.node.Node.prototype';
  exports.factory = function() {
    return function() {
      return _toCMathMLNode.apply(this, arguments);
    };
  };
}

function _toCMathMLNode() {
  throw new Error(`unknown node: ${this.type}`);
}
