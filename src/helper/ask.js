import { execSync } from 'child_process';

export default function askCreator(template = '') {
  let user = execSync('git config --global user.name', { encoding: 'utf-8' });
  let email = execSync('git config --global user.email', { encoding: 'utf-8' });

  user = user.trim();
  email = email.trim();

  return [
    {
      type   : 'input',
      name   : 'description',
      message: 'description',
      default: "A Vue.js project"
    },
    {
      type   : 'input',
      name   : 'license',
      message: 'license',
      default: 'MIT'
    },
    {
      type   : 'input',
      name   : 'author',
      message: 'author',
      default: email
    },
    {
      type   : 'confirm',
      name   : 'sass',
      message: 'Use sass?',
      default: false
    }
  ];
}
