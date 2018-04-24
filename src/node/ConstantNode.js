'use strict';

const XMLDocument = require('../XMLDocument');

exports.name = 'toCMathMLNode';
exports.path = 'expression.node.ConstantNode.prototype';
exports.factory = function() {
  return function() {
    return _toCMathMLNode.apply(this, arguments);
  };
};

function _toCMathMLNode(parentXML) {
  let XMLNode = new XMLDocument().createElement('cn');
  if (String(this.value).match(/^[\d]+[.]?[\d]*[e][+-][\d]+$/)) {
    XMLNode.setAttribute('type', 'e-notation');
    var value = String(this.value).match(/^([\d]+[.]?[\d]*)[e]([+-][\d]+)$/);
    XMLNode.appendChild(new XMLDocument().createTextNode(value[1]));
    XMLNode.appendChild(new XMLDocument().createElement('sep'));
    XMLNode.appendChild(new XMLDocument().createTextNode(value[2]));
  }
  else {
    XMLNode.appendChild(new XMLDocument().createTextNode(this.value));
  }
  parentXML.appendChild(XMLNode);
}
