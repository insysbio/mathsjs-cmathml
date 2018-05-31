'use strict';

exports.name = 'toCMathMLNode';
exports.path = 'expression.node.ParenthesisNode.prototype';
exports.factory = function() {
  return function() {
    let parentXML = arguments[0];
    this.content.toCMathMLNode(parentXML);
  };
};
