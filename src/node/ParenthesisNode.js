'use strict';

exports.name = 'toCMathMLNode';
exports.path = 'expression.node.ParenthesisNode.prototype';
exports.factory = function() {
  return function(parentXML) {
    this.content.toCMathMLNode(parentXML);
  };
};
