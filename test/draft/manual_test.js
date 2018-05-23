/**
 * @file Transformation of mathematical expressions between formats
 * @author Evgeny Metelkin <evgeny.metelkin@gmail.com>
 * @copyright InSysBio, LLC, 2017
 * @module math-converter/index
*/
'use strict';

// import external
const math = require('mathjs');

math.import(require('../../src')); // add function to toCMathML

let m = math.parse('a');

let xmlString = m
  .toCMathML()
  .toString();

console.log(xmlString);
