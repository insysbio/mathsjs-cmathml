'use strict';

module.exports = {
  name: 'toCMathMLNode',
  path: 'expression.node.Node.prototype',
  factory: function() {
    return function() {
      throw new Error(`unknown node: ${this.type}`);
    };
  }
};
