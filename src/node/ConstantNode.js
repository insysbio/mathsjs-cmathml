'use strict';

module.exports = {
  name: 'toCMathMLNode',
  path: 'expression.node.ConstantNode.prototype',
  factory: function() {
    return function(parentXML) {
      let XMLNode = parentXML
        .ownerDocument.createElementNS('http://www.w3.org/1998/Math/MathML', 'cn');
      if (String(this.value).match(/^[\d]+[.]?[\d]*[e][+-][\d]+$/)) {
        XMLNode.setAttribute('type', 'e-notation');
        var value = String(this.value).match(/^([\d]+[.]?[\d]*)[e]([+-][\d]+)$/);
        XMLNode
          .appendChild(parentXML.ownerDocument.createTextNode(value[1]));
        XMLNode
          .appendChild(parentXML.ownerDocument.createElementNS(
            'http://www.w3.org/1998/Math/MathML',
            'sep'
          ));
        XMLNode
          .appendChild(parentXML.ownerDocument.createTextNode(value[2]));
      } else {
        XMLNode.appendChild(parentXML.ownerDocument.createTextNode(this.value));
      }
      parentXML.appendChild(XMLNode);
    };
  }
};
