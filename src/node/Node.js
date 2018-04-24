'use strict';

exports.name = 'toCMathMLNode';
exports.path = 'expression.node.Node.prototype';
exports.factory = function() {
  return function() {
    return _toCMathMLNode.apply(this);
  };
};

function _toCMathMLNode() {
  throw new Error(`unknown node: ${this.type}`);
}
