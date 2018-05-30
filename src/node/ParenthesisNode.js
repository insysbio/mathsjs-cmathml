/*global window:true*/
'use strict';

exports.name = 'toCMathMLNode';
exports.path = 'expression.node.ParenthesisNode.prototype';
exports.factory = function() {
  return function() {
    let parentXML = arguments[0];
    let apply = parentXML.ownerDocument
      .createElementNS('http://www.w3.org/1998/Math/MathML', 'apply');
    this.content.toCMathMLNode(apply);
    parentXML.appendChild(apply);
  };
};
