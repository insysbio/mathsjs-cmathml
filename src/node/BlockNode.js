'use strict';

exports.name = 'toCMathMLNode';
exports.path = 'expression.node.BlockNode.prototype';
exports.factory = function() {
  return function(parentXML) {
    let list = parentXML
      .ownerDocument
      .createElementNS('http://www.w3.org/1998/Math/MathML', 'list');
    this.blocks.forEach((item) => {
      item.node.toCMathMLNode(list);
    });

    parentXML.appendChild(list);
  };
};
