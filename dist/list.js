'use strict';

var _logger = require('./utils/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * list repos
 */

request({
  url: 'https://api.github.com/users/vuejs-templates/repos',
  headers: {
    'User-Agent': 'vue-cli'
  }
}, (err, res, body) => {
  if (err) _logger2.default.fatal(err);
  const requestBody = JSON.parse(body);
  if (Array.isArray(requestBody)) {
    console.log('  Available official templates:');
    console.log();
    requestBody.forEach(repo => {
      console.log('  ' + chalk.yellow('★') + '  ' + chalk.blue(repo.name) + ' - ' + repo.description);
    });
  } else {
    console.error(requestBody.message);
  }
});