
import downloadGit from 'download-git-repo'
import request from 'request'
import { basename } from 'path'
import rc from './rc'
import { dirs, userAgent } from './defs'
import logger from './logger'

function fetch (api) {
  return new Promise((resolve, reject) => {
    request({
      url: api,
      method: 'GET',
      headers: {
        'User-Agent': `${userAgent}`
      }
    }, (err, res, body) => {
      if (err) {
        reject(err)
      } else {
        const data = JSON.parse(body)
        if (data.message === 'Not Found') {
          logger.error(`${api} not found`)
        } else {
          resolve(data)
        }
      }
    })
  })
}

export const repoList = async () => {
  const { type, registry } = await rc()
  const api = `https://api.github.com/${type}s/${registry}/repos`
  return await fetch(api)
}

const getGitInfo = async (repo) => {
  let template = repo;
  let [scaffold] = template.split('@');

  scaffold = basename(scaffold);

  template = template.split('@').filter(Boolean).join('#');
  const registry = await rc('registry');
  const url = `${registry}/${template}`;
  return {
    url,
    scaffold
  };
};

export const tagsList = async () =>{
  
}