'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

let apply = (() => {
  var _ref = _asyncToGenerator(function* () {
    let loader, choices, answers, version;

    loader = (0, _loading2.default)('repo list fetching...');
    const repos = yield (0, _git.repoList)();
    loader.succeed();

    if (repos.length === 0) {
      const registry = yield rc('registry');
      throw new Error(`There is no any scaffolds in https://github.com/${registry}. Please create and try`);
    }

    // Object choices, name for display in list,
    // value for save in answers hash, short for display after selection
    choices = repos.map(function ({ name, description }) {
      let result = {};
      result.name = ` ${_chalk2.default.yellow('★')}  ${name} - ${description}`;
      result.value = name;
      result.short = name;
      return result;
    });

    answers = yield _inquirer2.default.prompt([{
      type: 'list',
      name: 'repo',
      message: 'which repo do you want to install?',
      choices
    }]);

    const repo = answers.repo;
  });

  return function apply() {
    return _ref.apply(this, arguments);
  };
})();

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _loading = require('./utils/loading');

var _loading2 = _interopRequireDefault(_loading);

var _git = require('./utils/git');

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = apply;