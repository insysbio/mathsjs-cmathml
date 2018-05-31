/* global window math */
/**
 * File for creation file "mathjs-cmathml.min.js" to use in browser directly.
 * `<script src="./mathjs-cmathml.min.js"></script>`
 * This creates global variable cmathml. It can be loaded using `math.import(cmathm)`.
 *
 * Use `npm run dev` to create the minified file using webpack in folder dist.
 */
'use strict';

window.cmathml = require('./webpack');
// math.import(require('./webpack')); // alternative solution for auto-load
