/**
 * @file Transformation of mathematical expressions between formats
 * @author Evgeny Metelkin <evgeny.metelkin@gmail.com>
 * @copyright InSysBio, LLC, 2017
 * @module math-converter/index
*/
"use strict";

// import external
const math = require("mathjs");

math.import(require("../src/to_content_mathml")); // add function to toCMathML

let m = math.parse("a+1");
let xmlString = m
 .toCMathML()
 .toString();

console.log(xmlString);
