'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.repos = exports.userAgent = exports.versions = exports.alias = exports.defaults = exports.dirs = undefined;

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _package = require('../../package.json');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// define vars
const home = process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'];

const dirs = exports.dirs = {
  home,
  download: `${home}/.ypweb`,
  rc: `${home}/.ypwebrc`,
  tmp: _os2.default.tmpdir(),
  metalsmith: 'metalsmith'
};

const defaults = exports.defaults = {
  registry: 'vue-templates',
  type: 'org', // ['org', 'user']
  metalsmith: true
};

const alias = exports.alias = {
  install: 'i',
  uninstall: 'uni',
  update: 'up',
  list: 'ls',
  help: 'h',
  init: 'g',
  config: 'c',
  search: 's'
};

const versions = exports.versions = {
  node: process.version.substr(1),
  nodeEngines: _package.engines.node,
  [_package.name]: _package.version
};

const userAgent = exports.userAgent = `${_package.name}-${_package.version}`;

const repos = exports.repos = {
  default: 'https://github.com',
  github: 'https://github.com',
  gitLab: 'http://git.thejoyrun.com/'
};