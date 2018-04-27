'use strict';

exports.name = 'toCMathMLNode';
exports.path = 'expression.node.ParenthesisNode.prototype';
exports.factory = function() {
  return function() {
    return _toCMathMLNode.apply(this, arguments);
  };
};

function _toCMathMLNode(parentXML) {
  let apply = parentXML.ownerDocument.createElement('apply');
  this.content.toCMathMLNode(apply);
  parentXML.appendChild(apply);
}
