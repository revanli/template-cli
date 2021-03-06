import { execSync } from 'child_process';

export default function askCreator(template = '') {
  let user = execSync('git config --global user.name', { encoding: 'utf-8' });
  let email = execSync('git config --global user.email', { encoding: 'utf-8' });

  user = user.trim();
  email = email.trim();

  return [
    {
      type   : 'confirm',
      name   : 'private',
      message: 'Is the project private ?'
    },
    {
      type   : 'input',
      name   : 'name',
      message: 'package name',
      default: template,
      validate(input) {
        const done = this.async();
        if (input.trim().length === 0) {
          done('project name is empty');
          return;
        }
        done(null, true);
      }
    },
    {
      type   : 'input',
      name   : 'description',
      message: 'description',
      default: 'A Vue project'
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
      type   : 'input',
      name   : 'git',
      message: 'user/repo',
      default: `${user}/${template}`,
      validate(input) {
        const done = this.async();
        if (!/\w+\/\w+/.test(input)) {
          done('Please input like user/repo');
          return;
        }
        done(null, true);
      }
    }
  ];
}
