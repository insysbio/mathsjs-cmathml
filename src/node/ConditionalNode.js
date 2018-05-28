/*eslint complexity: ["error", 4]*/
/*global window:true*/
'use strict';

const {jsEnv} = require('../isEnv');

if (jsEnv.isBrowser) {
  window['math'].expression.node.ConditionalNode.prototype.toCMathMLNode = function() {
    return _toCMathMLNode.apply(this, arguments);
  };
}

if (jsEnv.isNode) {
  exports.name = 'toCMathMLNode';
  exports.path = 'expression.node.ConditionalNode.prototype';
  exports.factory = function() {
    return function() {
      return _toCMathMLNode.apply(this, arguments);
    };
  };
}



function _toCMathMLNode(parentXML) {
  var piecewise = parentXML.ownerDocument.createElementNS('http://www.w3.org/1998/Math/MathML', 'piecewise');
  var piece = parentXML.ownerDocument.createElementNS('http://www.w3.org/1998/Math/MathML', 'piece');
  var otherwise = parentXML.ownerDocument.createElementNS('http://www.w3.org/1998/Math/MathML', 'otherwise');

  if(this.trueExpr) this.trueExpr.toCMathMLNode(piece);
  if(this.falseExpr) this.falseExpr.toCMathMLNode(otherwise);
  if(this.condition) this.condition.toCMathMLNode(piece);

  piecewise.appendChild(piece);
  piecewise.appendChild(otherwise);
  parentXML.appendChild(piecewise);
}
