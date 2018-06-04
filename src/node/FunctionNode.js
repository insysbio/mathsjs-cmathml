'use strict';

const dictFunc = require('../dictionary');

exports.name = 'toCMathMLNode';
exports.path = 'expression.node.FunctionNode.prototype';
exports.factory = function() {
  return function(parentXML) {
    let apply = parentXML
      .ownerDocument
      .createElementNS('http://www.w3.org/1998/Math/MathML', 'apply');
    apply.appendChild(parentXML.ownerDocument.createElementNS(
      'http://www.w3.org/1998/Math/MathML',
      dictFunc[this.fn.name] || this.fn.name)
    );
    if (this.args) {
      this.args.forEach((item) => {
        item.toCMathMLNode(apply);
      });
    }
    parentXML.appendChild(apply);
  };
};
