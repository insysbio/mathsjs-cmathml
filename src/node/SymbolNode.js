'use strict';

const XMLDocument = require('../XMLDocument');

exports.name = 'toCMathMLNode';
exports.path = 'expression.node.SymbolNode.prototype';
exports.factory = function() {
  return function() {
    return _toCMathMLNode.apply(this, arguments);
  };
};

function _toCMathMLNode(parentXML) {
  let XMLNode = new XMLDocument().createElement('ci');
  XMLNode.appendChild(new XMLDocument().createTextNode(this.name));
  parentXML.appendChild(XMLNode);
}
