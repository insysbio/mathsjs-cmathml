'use strict';
/*global describe it :true*/

const assert = require('assert');
const math = require('mathjs');
const nodeCases = require('./cases/nodes.json');

math.import(require('../src')); // add function to toCMathML

describe('Nodes:', function(){
  for(let nodeCase in nodeCases) {
    let case_i = nodeCases[nodeCase];
    it(`${nodeCase}: "${case_i.formula}"`, () => {
      assert.equal(
        math.parse(case_i.formula).toCMathML().toString(),
        case_i.expected
      );
    });
  }
});
