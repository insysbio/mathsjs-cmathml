'use strict';

const dictFunc = require('../dictionaryFunction');

exports.name = 'toCMathMLNode';
exports.path = 'expression.node.FunctionNode.prototype';
exports.factory = function() {
  return function() {
    return _toCMathMLNode.apply(this, arguments);
  };
};

function _toCMathMLNode(parentXML) {
  let apply = parentXML.ownerDocument.createElement('apply');
  apply.appendChild(parentXML.ownerDocument.createElement(dictFunc[this.fn.name] || this.fn.name));
  if (this.args) {
    this.args.forEach((item) => {
      item.toCMathMLNode(apply);
    });
  }
  parentXML.appendChild(apply);
}
