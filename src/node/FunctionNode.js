/*global window:true*/
'use strict';

const jsEnv = require('browser-or-node');

if (jsEnv.isBrowser) {
  window['math'].expression.node.FunctionNode.prototype.toCMathMLNode = function() {
    return _toCMathMLNode.apply(this, arguments);
  };
}

if (jsEnv.isNode) {
  exports.name = 'toCMathMLNode';
  exports.path = 'expression.node.FunctionNode.prototype';
  exports.factory = function() {
    return function() {
      return _toCMathMLNode.apply(this, arguments);
    };
  };
}

const dictFunc = require('../dictionaryFunction');

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
