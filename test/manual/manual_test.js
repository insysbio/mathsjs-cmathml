'use strict';

// import external
const math = require('mathjs');

math.import(require('../../src')); // add function to toCMathML

let source = 'x*(y*z)';
console.log(source);

let m = math.parse(source);
console.log(m);

let xmlString = m
  .toCMathML()
  .toString();

console.log(xmlString);
