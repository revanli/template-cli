const chalk = require('chalk')
const format = require('util').format

/**
 * Prefix
 */
const prefix = '   template-cli'
const sep = chalk.gray('·')

/**
 * Log a 'message' to the console
 * @param  {String} message
 * @return {[type]} void
 */

exports.log = function (...args) {
  const msg = format.apply(format, args)
  console.log(chalk.white(prefix), sep, msg)
}

/**
 * Log an error 'message' to the console and exit
 * @param  {[type]} args [message]
 * @return {[type]}      void
 */
exports.fatal = function (...args) {
  if (args[0] instanceof Error) args[0] = args[0].message.trim()
  const msg = format.apply(format, args)
  console.error(chalk.red(prefix), sep, msg)
  process.exit(1)
}

/**
 * Log a success 'message' to the console and exit
 * @param  {[type]} args [message]
 * @return {[type]}      [void]
 */
exports.success = function (...args) {
  const msg = format.apply(format, args)
  console.log(chalk.white(prefix), sep, msg)
}
