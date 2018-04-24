'use strict';

const XMLDocument = require('../XMLDocument');
const dictFunc = require('../dictionaryFunction.json');

exports.name = 'toCMathMLNode';
exports.path = 'expression.node.OperatorNode.prototype';
exports.factory = function() {
  return function() {
    return _toCMathMLNode.apply(this, arguments);
  };
};

function _toCMathMLNode(parentXML) {
  let apply = new XMLDocument().createElement('apply');
  apply.appendChild(new XMLDocument().createElement(dictFunc[this.fn]));

  if (this.args) {
    this.args.forEach((item) => {
      item.toCMathMLNode(apply, item);
    });
  }
  parentXML.appendChild(apply);
}
