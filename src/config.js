/**
 * command config
 * ypweb config               // init confg or get default config
 * ypweb config remove <key>  // set key map value null
 * ypweb config get <key>     // get key map value
 */

import rc from './utils/rc'
import chalk from 'chalk'

async function apply (action, k, v) {
  console.log('action>>>', action, 'k>>>>', k, 'v>>>>', v);
  let config

  switch (action) {
    case 'get':
      config = await rc(k)
      if (!k) {
        Object.keys(config).forEach(key => console.log(`${chalk.green(key)}=${chalk.yellow(config[key])}`))
      } else {
        console.log(chalk.yellow(config))
      }
      break;
    case 'remove':
      await rc(k, v, true)
      break;
    case 'set':
      await rc(k, v)
      return true
    default:
      config = await rc()
      Object.keys(config).forEach(key => console.log(`${chalk.green(key)}=${chalk.yellow(config[key])}`))
  }
}

export default apply
