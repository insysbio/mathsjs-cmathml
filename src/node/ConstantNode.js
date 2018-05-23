/*global window:true*/
'use strict';

const {jsEnv} = require('../isEnv');

if (jsEnv.isBrowser) {
  window['math'].expression.node.ConstantNode.prototype.toCMathMLNode = function() {
    return _toCMathMLNode.apply(this, arguments);
  };
}

if (jsEnv.isNode) {
  exports.name = 'toCMathMLNode';
  exports.path = 'expression.node.ConstantNode.prototype';
  exports.factory = function() {
    return function() {
      return _toCMathMLNode.apply(this, arguments);
    };
  };
}

function _toCMathMLNode(parentXML) {
  let XMLNode = parentXML.ownerDocument.createElement('cn');
  if (String(this.value).match(/^[\d]+[.]?[\d]*[e][+-][\d]+$/)) {
    XMLNode.setAttribute('type', 'e-notation');
    var value = String(this.value).match(/^([\d]+[.]?[\d]*)[e]([+-][\d]+)$/);
    XMLNode.appendChild(parentXML.ownerDocument.createTextNode(value[1]));
    XMLNode.appendChild(parentXML.ownerDocument.createElement('sep'));
    XMLNode.appendChild(parentXML.ownerDocument.createTextNode(value[2]));
  }
  else {
    XMLNode.appendChild(parentXML.ownerDocument.createTextNode(this.value));
  }
  parentXML.appendChild(XMLNode);
}
