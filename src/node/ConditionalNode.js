/*eslint complexity: ["error", 4]*/
'use strict';

const XMLDocument = require('../XMLDocument');

exports.name = 'toCMathMLNode';
exports.path = 'expression.node.ConditionalNode.prototype';
exports.factory = function() {
  return function() {
    return _toCMathMLNode.apply(this, arguments);
  };
};

function _toCMathMLNode(parentXML) {
  var piecewise = new XMLDocument().createElement('piecewise');
  var piece = new XMLDocument().createElement('piece');
  var otherwise = new XMLDocument().createElement('otherwise');

  if(this.trueExpr) this.trueExpr.toCMathMLNode(piece);
  if(this.falseExpr) this.falseExpr.toCMathMLNode(otherwise);
  if(this.condition) this.condition.toCMathMLNode(piece);

  piecewise.appendChild(piece);
  piecewise.appendChild(otherwise);
  parentXML.appendChild(piecewise);
}
