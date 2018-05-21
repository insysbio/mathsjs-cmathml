/*global window:true*/
'use strict';

const jsEnv = require('browser-or-node');

if (jsEnv.isBrowser) {
  window['math'].expression.node.FunctionAssignmentNode.prototype.toCMathMLNode = function() {
    return _toCMathMLNode.apply(this);
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
  var lambda = parentXML.ownerDocument.createElement('lambda');

  this.params.forEach(function(item) {
    var bvar = parentXML.ownerDocument.createElement('bvar');
    var param = parentXML.ownerDocument.createElement('ci');
    param.appendChild(parentXML.ownerDocument.createTextNode(item));
    bvar.appendChild(param);
    lambda.appendChild(bvar);
  });

  if (this.expr) this.expr.toCMathMLNode(lambda);

  parentXML.appendChild(lambda);
}
