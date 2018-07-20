import program from 'commander'
import ypweb from './index'
import { version } from '../package.json'
import { dirs, alias } from './utils/defs'
import rc from './utils/rc'

function help () {
  console.log('')
  console.log('  How to use:')
  console.log()
  console.log('    - ypweb install')
  console.log('    - ypweb config set <key> <value>')
  console.log('    - ypweb config remove <key>')
  console.log('    - ypweb config get <key>')
  console.log('    - ypweb config help')
  console.log()
}

function registeredProgram (program, type, typeInfo) {
  program
    .command(type)
    .description(typeInfo[type])
    .alias(alias[type])
    .action(async () => {
      try {
        if (type === 'config') {
          // get config third paramter, eg: ypweb config help -> help
          await ypweb('config', ...process.argv.slice(3))
        } else if (type === 'help') {
          help()
        } else {
          await ypweb(type)
        }
      } catch (e) {
        console.log(e);
      }
    })

  return program
}

try {
  (async function run() {
    const registry = await rc('registry')
    const programTypes = {
      install    : `install remote templates from https://github.com/${registry}`,
      help       : 'more help info:',
      config     : `${dirs.rc} config file set and get`,
      '*'        : 'The command is not found'
    }

    program
      .version(version, '-v, --version')
      .usage('<command> [options]')

    // 遍历commander
    Object.keys(programTypes)
      .reduce((pre, type) => registeredProgram(pre, type, programTypes), program)


    program
      .on('-h', help)
      .on('--help', help)
      .parse(process.argv)

    // default
    if (program.args.length < 1) program.help()
  }())
} catch (e) {
  console.log(e)
  help()
}
