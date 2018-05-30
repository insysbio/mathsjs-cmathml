'use strict';
const {DOMParser} = require('xmldom');

const mods = [
  require('./toCMathML')(DOMParser),
  require('./node/Node.js'),
  require('./node/SymbolNode.js'),
  require('./node/ConstantNode.js'),
  require('./node/FunctionNode.js'),
  require('./node/OperatorNode.js'),
  require('./node/ParenthesisNode.js'),
  require('./node/FunctionAssignmentNode.js'),
  require('./node/AssignmentNode.js'),
  require('./node/ConditionalNode.js'),
  require('./node/ArrayNode.js'),
  require('./node/BlockNode.js')
];

if(typeof window === 'undefined') {
  module.exports = mods;
}else{
  window.cmathml = mods; // load as global
  // math.import[mods]; // load in math
}
