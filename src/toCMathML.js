/*global window:true*/
'use strict';


const Node = require('./node/Node.js');
const SymbolNode = require('./node/SymbolNode.js');
const ConstantNode = require('./node/ConstantNode.js');
const FunctionNode = require('./node/FunctionNode.js');
const OperatorNode = require('./node/OperatorNode.js');
const ParenthesisNode = require('./node/ParenthesisNode.js');
const FunctionAssignmentNode = require('./node/FunctionAssignmentNode.js');
const AssignmentNode = require('./node/AssignmentNode.js');
const ConditionalNode = require('./node/ConditionalNode.js');

const jsEnv = require('browser-or-node');
const MathMLDocument = require('./MathMLDocument');
const math = require('mathjs');

if (jsEnv.isNode) {
  math.import(Node);
  math.import(SymbolNode);
  math.import(ConstantNode);
  math.import(FunctionNode);
  math.import(OperatorNode);
  math.import(ParenthesisNode);
  math.import(FunctionAssignmentNode);
  math.import(AssignmentNode);
  math.import(ConditionalNode);

  exports.name = 'toCMathML';
  exports.path = 'expression.node.Node.prototype';
  exports.factory = function() {
    return function() {
      return _cMathMl.apply(this);
    };
  };
}

if (jsEnv.isBrowser) {
  window['math'].expression.node.Node.prototype.toCMathML = function() {
    return _cMathMl.apply(this);
  };
}

let _cMathMl = function() {
  if (!(_validate(this.toString()))) {
    return false;
  }

  let doc = new MathMLDocument();
  this.toCMathMLNode(doc.documentElement);

  return doc;
};

function _validate(formula) {
  let isWrong = /^[^*/+-\w()_,.><= ?:]/.test(formula);// /[^\^*\/+-\w()_,.\>\<\= \?\:]/
  return !isWrong;
}
