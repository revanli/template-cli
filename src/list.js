
import logger from './utils/logger'

/**
 * list repos
 */

 request({
   url: 'https://api.github.com/users/vuejs-templates/repos',
   headers: {
     'User-Agent': 'vue-cli'
   }
 }, (err, res, body) => {
   if (err) logger.fatal(err)
   const requestBody = JSON.parse(body)
   if (Array.isArray(requestBody)) {
     console.log('  Available official templates:')
     console.log()
     requestBody.forEach(repo => {
       console.log(
         '  ' + chalk.yellow('★') +
         '  ' + chalk.blue(repo.name) +
         ' - ' + repo.description)
     })
   } else {
     console.error(requestBody.message)
   }
 })