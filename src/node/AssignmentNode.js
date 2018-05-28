/*global window:true*/
'use strict';

const {jsEnv} = require('../isEnv');

if (jsEnv.isBrowser) {
  window['math'].expression.node.AssignmentNode.prototype.toCMathMLNode = function() {
    return _toCMathMLNode.apply(this, arguments);
  };
}

if (jsEnv.isNode) {
  exports.name = 'toCMathMLNode';
  exports.path = 'expression.node.AssignmentNode.prototype';
  exports.factory = function() {
    return function() {
      return _toCMathMLNode.apply(this, arguments);
    };
  };
}

function _toCMathMLNode(parentXML) {
  let apply = parentXML.ownerDocument.createElementNS('http://www.w3.org/1998/Math/MathML', 'apply');
  apply.appendChild(parentXML.ownerDocument.createElementNS('http://www.w3.org/1998/Math/MathML', 'eq'));

  this.object.toCMathMLNode(apply);
  this.value.toCMathMLNode(apply);

  parentXML.appendChild(apply);
}
