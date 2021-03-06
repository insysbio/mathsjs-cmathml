'use strict';

module.exports = {
  name: 'toCMathMLNode',
  path: 'expression.node.SymbolNode.prototype',
  factory: function() {
    return function(parentXML) {
      let XMLNode = parentXML
        .ownerDocument
        .createElementNS('http://www.w3.org/1998/Math/MathML', 'ci');
      XMLNode.appendChild(parentXML.ownerDocument.createTextNode(this.name));
      parentXML.appendChild(XMLNode);
    };
  }
};
