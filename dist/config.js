'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

let apply = (() => {
  var _ref = _asyncToGenerator(function* (action, k, v) {
    console.log('action>>>', action, 'k>>>>', k, 'v>>>>', v);
    let config;

    switch (action) {
      case 'get':
        config = yield (0, _rc2.default)(k);
        if (!k) {
          Object.keys(config).forEach(function (key) {
            return console.log(`${_chalk2.default.green(key)}=${_chalk2.default.yellow(config[key])}`);
          });
        } else {
          console.log(_chalk2.default.yellow(config));
        }
        break;
      case 'remove':
        yield (0, _rc2.default)(k, v, true);
        break;
      case 'set':
        yield (0, _rc2.default)(k, v);
        return true;
      default:
        config = yield (0, _rc2.default)();
        Object.keys(config).forEach(function (key) {
          return console.log(`${_chalk2.default.green(key)}=${_chalk2.default.yellow(config[key])}`);
        });
    }
  });

  return function apply(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})();

var _rc = require('./utils/rc');

var _rc2 = _interopRequireDefault(_rc);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * command config
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * ypweb config               // init confg or get default config
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * ypweb config remove <key>  // set key map value null
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * ypweb config get <key>     // get key map value
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */

exports.default = apply;