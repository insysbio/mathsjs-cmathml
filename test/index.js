'use strict';
/*global describe it :true*/

const assert = require('assert');
const math = require('mathjs');
const nodeCases = require('./cases/nodes.json');

math.import(require('../src')); // add function to toCMathML
describe('Nodes:', function(){
  for(let nodeCase in nodeCases) {
    it(nodeCase, () => {
      assert.equal(
        math.parse(nodeCases[nodeCase].formula).toCMathML().toString(),
        nodeCases[nodeCase].expected
      );
    });
  }
});
