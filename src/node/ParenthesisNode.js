/*global window:true*/
'use strict';

const {jsEnv} = require('../isEnv');

if (jsEnv.isBrowser) {
  window['math'].expression.node.ParenthesisNode.prototype.toCMathMLNode = function() {
    return _toCMathMLNode.apply(this, arguments);
  };
}

if (jsEnv.isNode) {
  exports.name = 'toCMathMLNode';
  exports.path = 'expression.node.ParenthesisNode.prototype';
  exports.factory = function() {
    return function() {
      return _toCMathMLNode.apply(this, arguments);
    };
  };
}

function _toCMathMLNode(parentXML) {
  let apply = parentXML.ownerDocument.createElement('apply');
  this.content.toCMathMLNode(apply);
  parentXML.appendChild(apply);
}
