/*global window:true*/
'use strict';

const {jsEnv} = require('../isEnv');

if (jsEnv.isBrowser) {
  window['math'].expression.node.FunctionAssignmentNode.prototype.toCMathMLNode = function() {
    return _toCMathMLNode.apply(this, arguments);
  };
}

if (jsEnv.isNode) {
  exports.name = 'toCMathMLNode';
  exports.path = 'expression.node.FunctionAssignmentNode.prototype';
  exports.factory = function() {
    return function() {
      return _toCMathMLNode.apply(this, arguments);
    };
  };
}

function _toCMathMLNode(parentXML) {
  var lambda = parentXML.ownerDocument.createElementNS('http://www.w3.org/1998/Math/MathML', 'lambda');

  this.params.forEach(function(item) {
    var bvar = parentXML.ownerDocument.createElementNS('http://www.w3.org/1998/Math/MathML', 'bvar');
    var param = parentXML.ownerDocument.createElementNS('http://www.w3.org/1998/Math/MathML', 'ci');
    param.appendChild(parentXML.ownerDocument.createTextNode(item));
    bvar.appendChild(param);
    lambda.appendChild(bvar);
  });

  if (this.expr) this.expr.toCMathMLNode(lambda);

  parentXML.appendChild(lambda);
}
