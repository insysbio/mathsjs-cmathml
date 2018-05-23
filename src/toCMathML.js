/*global window:true*/
'use strict';
const MathMLDocument = require('./MathMLDocument');
const {jsEnv} = require('./isEnv');

const Node = require('./node/Node.js');
const SymbolNode = require('./node/SymbolNode.js');
const ConstantNode = require('./node/ConstantNode.js');
const FunctionNode = require('./node/FunctionNode.js');
const OperatorNode = require('./node/OperatorNode.js');
const ParenthesisNode = require('./node/ParenthesisNode.js');
const FunctionAssignmentNode = require('./node/FunctionAssignmentNode.js');
const AssignmentNode = require('./node/AssignmentNode.js');
const ConditionalNode = require('./node/ConditionalNode.js');
const ArrayNode = require('./node/ArrayNode.js');

if (jsEnv.isNode) {
  exports.name = 'toCMathML';
  exports.path = 'expression.node.Node.prototype';
  exports.math = true;
  exports.factory = function (type, config, load, typed, math) {
    math.import([
      Node,
      ConstantNode,
      SymbolNode,
      FunctionNode,
      OperatorNode,
      ParenthesisNode,
      FunctionAssignmentNode,
      AssignmentNode,
      ConditionalNode,
      ArrayNode
    ]);
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
  //let isWrong = /^[^*/+-\w()_,.><= ?:]/.test(formula);// /[^\^*\/+-\w()_,.\>\<\= \?\:]/
  return true;
}
