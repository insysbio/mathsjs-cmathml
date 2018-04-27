'use strict';

exports.name = 'toCMathMLNode';
exports.path = 'expression.node.SymbolNode.prototype';
exports.factory = function() {
  return function() {
    return _toCMathMLNode.apply(this, arguments);
  };
};

function _toCMathMLNode(parentXML) {
  let XMLNode = parentXML.ownerDocument.createElement('ci');
  XMLNode.appendChild(parentXML.ownerDocument.createTextNode(this.name));
  parentXML.appendChild(XMLNode);
}
