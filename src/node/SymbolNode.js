/*global window:true*/
'use strict';

const jsEnv = require('browser-or-node');

if (jsEnv.isBrowser) {
  window['math'].expression.node.SymbolNode.prototype.toCMathMLNode = function() {
    return _toCMathMLNode.apply(this);
  };
}

if (jsEnv.isNode) {
  exports.name = 'toCMathMLNode';
  exports.path = 'expression.node.SymbolNode.prototype';
  exports.factory = function() {
    return function() {
      return _toCMathMLNode.apply(this, arguments);
    };
  };
}

function _toCMathMLNode(parentXML) {
  let XMLNode = parentXML.ownerDocument.createElement('ci');
  XMLNode.appendChild(parentXML.ownerDocument.createTextNode(this.name));
  parentXML.appendChild(XMLNode);
}
