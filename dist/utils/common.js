'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.betterRequire = betterRequire;

var _child_process = require('child_process');

function betterRequire(absolutePath) {
  const module = require(absolutePath);
  return exports.__esModule && module.default ? module.default : module;
}