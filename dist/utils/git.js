'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tagsList = exports.repoList = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _downloadGitRepo = require('download-git-repo');

var _downloadGitRepo2 = _interopRequireDefault(_downloadGitRepo);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _path = require('path');

var _rc = require('./rc');

var _rc2 = _interopRequireDefault(_rc);

var _defs = require('./defs');

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function fetch(api) {
  return new Promise((resolve, reject) => {
    (0, _request2.default)({
      url: api,
      method: 'GET',
      headers: {
        'User-Agent': `${_defs.userAgent}`
      }
    }, (err, res, body) => {
      if (err) {
        reject(err);
      } else {
        const data = JSON.parse(body);
        if (data.message === 'Not Found') {
          _logger2.default.error(`${api} not found`);
        } else {
          resolve(data);
        }
      }
    });
  });
}

const repoList = exports.repoList = (() => {
  var _ref = _asyncToGenerator(function* () {
    var _ref2 = yield (0, _rc2.default)();

    const type = _ref2.type,
          registry = _ref2.registry;

    const api = `https://api.github.com/${type}s/${registry}/repos`;
    return yield fetch(api);
  });

  return function repoList() {
    return _ref.apply(this, arguments);
  };
})();

const getGitInfo = (() => {
  var _ref3 = _asyncToGenerator(function* (repo) {
    let template = repo;

    var _template$split = template.split('@'),
        _template$split2 = _slicedToArray(_template$split, 1);

    let scaffold = _template$split2[0];


    scaffold = (0, _path.basename)(scaffold);

    template = template.split('@').filter(Boolean).join('#');
    const registry = yield (0, _rc2.default)('registry');
    const url = `${registry}/${template}`;
    return {
      url,
      scaffold
    };
  });

  return function getGitInfo(_x) {
    return _ref3.apply(this, arguments);
  };
})();

const tagsList = exports.tagsList = (() => {
  var _ref4 = _asyncToGenerator(function* () {});

  return function tagsList() {
    return _ref4.apply(this, arguments);
  };
})();