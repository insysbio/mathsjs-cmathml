'use strict';
/*global window:true*/

const MathMLDocument = require('./MathMLDocument');
const math = require('mathjs');

math.import(require('./node/Node.js'));
math.import(require('./node/SymbolNode.js'));
math.import(require('./node/ConstantNode.js'));
math.import(require('./node/FunctionNode.js'));
math.import(require('./node/OperatorNode.js'));
math.import(require('./node/ParenthesisNode.js'));
math.import(require('./node/FunctionAssignmentNode.js'));
math.import(require('./node/ConditionalNode.js'));

exports.name = 'toCMathML';
exports.path = 'expression.node.Node.prototype';
exports.factory = function() {
  return function() {
    return _cMathMl.apply(this);
  };
};

if(typeof window !== 'undefined' && typeof window['math'] !== 'undefined') {
  window['math'].expression.node.Node.prototype.toCMathML = function() {
    return _cMathMl.apply(this);
  };
}

let _cMathMl = function() {
  if (!(_validate(this.toString()))) {
    return false;
  }

  let document = new MathMLDocument();
  this.toCMathMLNode(document.documentElement);

  return document;
};

function _validate(formula) {
  let isWrong = /[^*/+-\w()_,.><= ?:]/.test(formula);
  return !isWrong;
}
