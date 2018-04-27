'use strict';

const dictFunc = require('../dictionaryFunction');

exports.name = 'toCMathMLNode';
exports.path = 'expression.node.OperatorNode.prototype';
exports.factory = function() {
  return function() {
    return _toCMathMLNode.apply(this, arguments);
  };
};

function _toCMathMLNode(parentXML) {
  let apply = parentXML.ownerDocument.createElement('apply');
  apply.appendChild(parentXML.ownerDocument.createElement(dictFunc[this.fn]));

  if (this.args) {
    this.args.forEach((item) => {
      item.toCMathMLNode(apply, item);
    });
  }
  parentXML.appendChild(apply);
}
