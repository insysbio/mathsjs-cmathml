'use strict';

const dictFunc = require('../dictionary');

exports.name = 'toCMathMLNode';
exports.path = 'expression.node.OperatorNode.prototype';
exports.factory = function() {
  return function(parentXML) {
    let apply = parentXML
      .ownerDocument
      .createElementNS('http://www.w3.org/1998/Math/MathML', 'apply');
    apply.appendChild(parentXML.ownerDocument.createElementNS(
      'http://www.w3.org/1998/Math/MathML',
      dictFunc[this.fn]
    ));

    if (this.args) {
      this.args.forEach((item) => {
        item.toCMathMLNode(apply, item);
      });
    }
    parentXML.appendChild(apply);
  };
};
