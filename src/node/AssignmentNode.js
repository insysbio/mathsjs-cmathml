'use strict';

exports.name = 'toCMathMLNode';
exports.path = 'expression.node.AssignmentNode.prototype';
exports.factory = function() {
  return function(parentXML) {
    let apply = parentXML
      .ownerDocument
      .createElementNS('http://www.w3.org/1998/Math/MathML', 'apply');
    apply
      .appendChild(
        parentXML.ownerDocument.createElementNS(
          'http://www.w3.org/1998/Math/MathML',
          'eq'
        )
      );

    this.object.toCMathMLNode(apply);
    this.value.toCMathMLNode(apply);

    parentXML.appendChild(apply);
  };
};
