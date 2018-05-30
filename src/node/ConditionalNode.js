'use strict';

exports.name = 'toCMathMLNode';
exports.path = 'expression.node.ConditionalNode.prototype';
exports.factory = function() {
  return function() {
    let parentXML = arguments[0];
    var piecewise = parentXML
      .ownerDocument
      .createElementNS('http://www.w3.org/1998/Math/MathML', 'piecewise');
    var piece = parentXML
      .ownerDocument
      .createElementNS('http://www.w3.org/1998/Math/MathML', 'piece');
    var otherwise = parentXML
      .ownerDocument
      .createElementNS('http://www.w3.org/1998/Math/MathML', 'otherwise');

    if(this.trueExpr) this.trueExpr.toCMathMLNode(piece);
    if(this.falseExpr) this.falseExpr.toCMathMLNode(otherwise);
    if(this.condition) this.condition.toCMathMLNode(piece);

    piecewise.appendChild(piece);
    piecewise.appendChild(otherwise);
    parentXML.appendChild(piecewise);
  };
};
