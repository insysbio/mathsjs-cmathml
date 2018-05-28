/*global window:true*/
'use strict';

const {jsEnv} = require('../isEnv');

if (jsEnv.isBrowser) {
  window['math'].expression.node.OperatorNode.prototype.toCMathMLNode = function() {
    return _toCMathMLNode.apply(this, arguments);
  };
}

if (jsEnv.isNode) {
  exports.name = 'toCMathMLNode';
  exports.path = 'expression.node.OperatorNode.prototype';
  exports.factory = function() {
    return function() {
      return _toCMathMLNode.apply(this, arguments);
    };
  };
}

const dictFunc = require('../dictionaryFunction');

function _toCMathMLNode(parentXML) {
  let apply = parentXML.ownerDocument.createElementNS('http://www.w3.org/1998/Math/MathML', 'apply');
  apply.appendChild(parentXML.ownerDocument.createElementNS('http://www.w3.org/1998/Math/MathML', dictFunc[this.fn]));

  if (this.args) {
    this.args.forEach((item) => {
      item.toCMathMLNode(apply, item);
    });
  }
  parentXML.appendChild(apply);
}
