'use strict';

exports.name = 'toCMathMLNode';
exports.path = 'expression.node.ArrayNode.prototype';
exports.factory = function() {
  return function() {
    let parentXML = arguments[0];
    let list = parentXML.ownerDocument
      .createElementNS('http://www.w3.org/1998/Math/MathML', 'list');
    this.items.forEach((item) => {
      item.toCMathMLNode(list);
    });

    parentXML.appendChild(list);
  };
};
