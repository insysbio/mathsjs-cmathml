'use strict';
const isEnv = require('browser-or-node');
const jsEnv = {
  isBrowser: isEnv.isBrowser,
  isNode: isEnv.isNode,
};
exports.jsEnv = jsEnv;
