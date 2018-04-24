'use strict';

const XMLDocument = require('../XMLDocument');

exports.name = 'toCMathMLNode';
exports.path = 'expression.node.FunctionAssignmentNode.prototype';
exports.factory = function() {
  return function() {
    return _toCMathMLNode.apply(this, arguments);
  };
};

function _toCMathMLNode(parentXML) {
  var lambda = new XMLDocument().createElement('lambda');

  this.params.forEach(function(item) {
    var bvar = new XMLDocument().createElement('bvar');
    var param = new XMLDocument().createElement('ci');
    param.appendChild(new XMLDocument().createTextNode(item));
    bvar.appendChild(param);
    lambda.appendChild(bvar);
  });

  if (this.expr) this.expr.toCMathMLNode(lambda);

  parentXML.appendChild(lambda);
}
