# mathsjs-cmathml

## Description

Extends mathjs http://mathjs.org/ library by function translating the internal object to content MathML https://www.w3.org/Math/

##Usage

Addon can be used in both node.js and in the browser.

```javascript
// NodeJS

const math = require('mathjs');
math.import(require(mathsjs-cmathml));

let mathml = math
    .parse('x*sin(y/z)')
    .toCMathML();
console.log(mathml);
```

## Maintainers

 - Viktoria Tkachenko @vetedde
 - Evgeny Metelkin @metelkin

## Copyright

InSysBio, Moscow, 2017-2018
http://insysbio.com
