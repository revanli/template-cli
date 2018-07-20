// define vars
import os from 'os';
import { name, version, engines } from '../../package.json';

const home = process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];

export const dirs = {
  home,
  download   : `${home}/.ypweb`,
  rc         : `${home}/.ypwebrc`,
  tmp        : os.tmpdir(),
  metalsmith : 'metalsmith'
};

export const defaults = {
  registry   : 'vue-templates',
  type       : 'org', // ['org', 'user']
  metalsmith : true
};

export const alias = {
  install  : 'i',
  uninstall: 'uni',
  update   : 'up',
  list     : 'ls',
  help     : 'h',
  init     : 'g',
  config   : 'c',
  search   : 's'
};

export const versions = {
  node       : process.version.substr(1),
  nodeEngines: engines.node,
  [name]     : version
};

export const userAgent = `${name}-${version}`

export const repos = {
  default: 'https://github.com',
  github: 'https://github.com',
  gitLab: 'http://git.thejoyrun.com/'
}
