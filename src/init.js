/**
 * ypweb init
 */
import inquirer from 'inquirer'
import rmfr from 'rmfr'
import { readdir, exists } from 'mz/fs'
import { resolve } from 'path'
import { dirs, interfaces } from './utils/defs'
import rc from './utils/rc'
import { runBash, wrapperAsync, betterRequire } from './utils/common'
import copy from './utils/copy'
import loading from './utils/loading'
import render from './render/render'
// import metal from './helper/metal'
import Metalsmith from 'metalsmith'
import logger from './utils/logger'
import metadata from 'read-metadata'

async function apply () {
  const download = dirs.download
  const root = process.cwd()

  if (!await exists(download)) {
    logger.error(`There is no ${download}, Please install a template`)
  }

  const list = await readdir(download);

  if (list.length === 0) {
    logger.error(`There is no any scaffolds in your local folder ${download}, install it`);
  }

  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'scaffold',
      message: 'which scaffold do you want to init?',
      choices: list
    }, {
      type: 'input',
      name: 'dir',
      message: 'project name?',
      async validate (input) {
        const done = this.async()

        if (input.length === 0) {
          done('You must input project name')
          return
        }

        const dir = resolve(root, input)
        const inPlace = await exists(dir)
        console.log('dir>>>', dir)

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

        done(null, true)
      }
    }
  ])

  let loader, ask, hook, reply;

  const metalsmith = await rc('metalsmith')
  const registry = await rc('registry')
  const scaffold = answers.scaffold
  const dir = answers.dir
  console.log('result>>>', metalsmith, scaffold, dir)

  if (metalsmith) {
    if (registry.indexOf('vue-templates') > -1) {
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
    }
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
}

/**
 * Gets the metadata from either a meta.json or meta.js file.
 *
 * @param  {String} dir
 * @return {Object}
 */

function getMetadata (dir) {
  const json = resolve(dir, 'meta.json')
  const js = resolve(dir, 'meta.js')
  let opts = {}

  if (exists(json)) {
    opts = metadata.sync(json)
  } else if (exists(js)) {
    const req = betterRequire(resolve(js))
    if (req !== Object(req)) {
      throw new Error('meta.js needs to expose an object')
    }
    opts = req
  }

  return opts
}

/**
 * Set the default value for a prompt question
 *
 * @param {Object} opts
 * @param {String} key
 * @param {String} val
 */

function setDefault (opts, key, val) {
  if (opts.schema) {
    opts.prompts = opts.schema
    delete opts.schema
  }
  const prompts = opts.prompts || (opts.prompts = {})
  if (!prompts[key] || typeof prompts[key] !== 'object') {
    prompts[key] = {
      'type': 'string',
      'default': val
    }
  } else {
    prompts[key]['default'] = val
  }
}


/**
 * Create a middleware for asking questions.
 *
 * @param {Object} prompts
 * @return {Function}
 */
function askQuestions (prompts) {
  return (files, metalsmith, done) => {
    ask(prompts, metalsmith.metadata(), done)
  }
}

export default apply
