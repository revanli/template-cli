'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = askCreator;

var _child_process = require('child_process');

function askCreator(template = '') {
  let user = (0, _child_process.execSync)('git config --global user.name', { encoding: 'utf-8' });
  let email = (0, _child_process.execSync)('git config --global user.email', { encoding: 'utf-8' });

  user = user.trim();
  email = email.trim();

  return [{
    type: 'input',
    name: 'description',
    message: 'description',
    default: "A Vue.js project"
  }, {
    type: 'input',
    name: 'license',
    message: 'license',
    default: 'MIT'
  }, {
    type: 'input',
    name: 'author',
    message: 'author',
    default: email
  }, {
    type: 'confirm',
    name: 'sass',
    message: 'Use sass?',
    default: false
  }];
}