'use strict';

module.exports = function(DOMParser){
  return {
    name: 'toCMathML',
    path: 'expression.node.Node.prototype',
    factory: function (type, config, load, typed) {
      return function toCMathML() {
        let doc = new DOMParser()
          .parseFromString(
            '<math xmlns=\'http://www.w3.org/1998/Math/MathML\'/>',
            'text/xml'
          );
        this.toCMathMLNode(doc.documentElement);
        return doc;
      };
    }
  };
};
