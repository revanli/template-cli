'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

let apply = (() => {
  var _ref = _asyncToGenerator(function* () {
    const download = _defs.dirs.download;
    const root = process.cwd();

    if (!(yield (0, _fs.exists)(download))) {
      _logger2.default.error(`There is no ${download}, Please install a template`);
    }

    const list = yield (0, _fs.readdir)(download);

    if (list.length === 0) {
      _logger2.default.error(`There is no any scaffolds in your local folder ${download}, install it`);
    }

    const answers = yield _inquirer2.default.prompt([{
      type: 'list',
      name: 'scaffold',
      message: 'which scaffold do you want to init?',
      choices: list
    }, {
      type: 'input',
      name: 'dir',
      message: 'project name?',
      validate(input) {
        var _this = this;

        return _asyncToGenerator(function* () {
          const done = _this.async();

          if (input.length === 0) {
            done('You must input project name');
            return;
          }

          const dir = (0, _path.resolve)(root, input);
          const inPlace = yield (0, _fs.exists)(dir);
          console.log('dir>>>', dir);

          // TODO: add comfirm replace
          // if (inPlace) {
          //   const ifReplaceAnswer = await inquirer.prompt([{
          //     type: 'confirm',
          //     message: inPlace
          //       ? 'Generate project in current directory?'
          //       : 'Target directory exists. Continue?',
          //     name: 'ok'
          //   }])
          //
          //    if (ifReplaceAnswer.ok) {
          //     done(null, true)
          //    }
          // }
          if (inPlace) {
            done('The project name is already existed. Please change another name');
          }

          done(null, true);
        })();
      }
    }]);

    let loader, ask, hook, reply;

    const metalsmith = yield (0, _rc2.default)('metalsmith');
    const registry = yield (0, _rc2.default)('registry');
    const scaffold = answers.scaffold;
    const dir = answers.dir;
    console.log('result>>>', metalsmith, scaffold, dir);

    if (metalsmith) {
      if (registry.indexOf('vue-templates') > -1) {}
      // const metalsmith = Metalsmith(resolve(download, scaffold, 'template'))
      // loader = loading('generating...', dir)
      // const opts = getMetadata(resolve(download, scaffold))
      // console.log('opts>>>', opts);
      //
      // metalsmith
      //   .use(askQuestions(opts.prompts))
      //   .source('./')
      //   .destination(resolve(root, dir))
      //   .clean(false)
      //   .use(render())
      //   .build(err => {
      //     if (err) {
      //       // reject(err);
      //       loader.fail(`generated fail, please try again`)
      //       return;
      //     }
      //     loader.succeed(`generated, To get started:\n\n  cd \n  npm install\n  npm run dev`);
      //     // resolve(true);
      //   });

      // if set the interface/ask.js from scaffold, use it
      // else use default ./helper/metalAsk.js
      // try {
      //   ask = betterRequire(`${download}/${interfaces.ask}`)
      // } catch (e) {
      //   ask = betterRequire(resolve(__dirname, './helper/ask.js'))
      // }
      //
      // if (typeof ask === 'function') {
      //   ask = ask(scaffold)
      // }

      //   if (!Array.isArray(ask)) {
      //     logger.error(`Please ensure your ${scaffold} ${interfaces.ask} is exported with Array or function that was returned an array`);
      //   }
      //
      //   reply = await inquirer.prompt(ask)
      //   loader = loading('generating...', dir)
      //   console.log(resolve(download, scaffold))
      //
      //   await metal(
      //     resolve(download, scaffold),
      //     resolve(root, dir),
      //     reply
      //   )
      //   loader.succeed(`generated ${dir}`)
      //
      //   // support hook function after for developer
      //
      //   try {
      //     hook = betterRequire(`${download}/${scaffold}/${interfaces.hook}`);
      //   } catch (e) {
      //     hook = { after() {} };
      //   }
      //
      //   hook.after = wrapperAsync(hook.after);
      //
      //   try {
      //     const meta = Object.assign({
      //       dir: `${root}/${dir}`,
      //       scaffold
      //     }, reply);
      //     await hook.after(meta, { runBash, loader, inquirer });
      //   } catch (e) {
      //     throw e;
      //   }
      // } else {
      //   loader = loading('generating', dir);
      //   await copy(`${download}/${scaffold}`, dir);
      //   loader.succeed(`generated, To get started:\n\n  cd \n  npm install\n  npm run dev`);
      // }
    }
  });

  return function apply() {
    return _ref.apply(this, arguments);
  };
})();

/**
 * Gets the metadata from either a meta.json or meta.js file.
 *
 * @param  {String} dir
 * @return {Object}
 */

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _rmfr = require('rmfr');

var _rmfr2 = _interopRequireDefault(_rmfr);

var _fs = require('mz/fs');

var _path = require('path');

var _defs = require('./utils/defs');

var _rc = require('./utils/rc');

var _rc2 = _interopRequireDefault(_rc);

var _common = require('./utils/common');

var _copy = require('./utils/copy');

var _copy2 = _interopRequireDefault(_copy);

var _loading = require('./utils/loading');

var _loading2 = _interopRequireDefault(_loading);

var _render = require('./render/render');

var _render2 = _interopRequireDefault(_render);

var _metalsmith = require('metalsmith');

var _metalsmith2 = _interopRequireDefault(_metalsmith);

var _logger = require('./utils/logger');

var _logger2 = _interopRequireDefault(_logger);

var _readMetadata = require('read-metadata');

var _readMetadata2 = _interopRequireDefault(_readMetadata);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * ypweb init
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */

// import metal from './helper/metal'


function getMetadata(dir) {
  const json = (0, _path.resolve)(dir, 'meta.json');
  const js = (0, _path.resolve)(dir, 'meta.js');
  let opts = {};

  if ((0, _fs.exists)(json)) {
    opts = _readMetadata2.default.sync(json);
  } else if ((0, _fs.exists)(js)) {
    const req = (0, _common.betterRequire)((0, _path.resolve)(js));
    if (req !== Object(req)) {
      throw new Error('meta.js needs to expose an object');
    }
    opts = req;
  }

  return opts;
}

/**
 * Set the default value for a prompt question
 *
 * @param {Object} opts
 * @param {String} key
 * @param {String} val
 */

function setDefault(opts, key, val) {
  if (opts.schema) {
    opts.prompts = opts.schema;
    delete opts.schema;
  }
  const prompts = opts.prompts || (opts.prompts = {});
  if (!prompts[key] || typeof prompts[key] !== 'object') {
    prompts[key] = {
      'type': 'string',
      'default': val
    };
  } else {
    prompts[key]['default'] = val;
  }
}

/**
 * Create a middleware for asking questions.
 *
 * @param {Object} prompts
 * @return {Function}
 */
function askQuestions(prompts) {
  return (files, metalsmith, done) => {
    ask(prompts, metalsmith.metadata(), done);
  };
}

exports.default = apply;