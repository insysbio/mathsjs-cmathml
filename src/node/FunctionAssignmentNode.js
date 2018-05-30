'use strict';

exports.name = 'toCMathMLNode';
exports.path = 'expression.node.FunctionAssignmentNode.prototype';
exports.factory = function() {
  return function() {
    let parentXML = arguments[0];
    var lambda = parentXML
      .ownerDocument
      .createElementNS('http://www.w3.org/1998/Math/MathML', 'lambda');

    this.params.forEach(function(item) {
      var bvar = parentXML
        .ownerDocument
        .createElementNS('http://www.w3.org/1998/Math/MathML', 'bvar');
      var param = parentXML
        .ownerDocument
        .createElementNS('http://www.w3.org/1998/Math/MathML', 'ci');
      param.appendChild(parentXML.ownerDocument.createTextNode(item));
      bvar.appendChild(param);
      lambda.appendChild(bvar);
    });

    if (this.expr) this.expr.toCMathMLNode(lambda);

    parentXML.appendChild(lambda);
  };
};
