import inquirer from 'inquirer';
import { readdir } from 'mz/fs';
import { dirs } from './utils/defs';
import { tagsList, download } from './utils/git';
import loading from './utils/loading';

async function apply () {
  let answers,
    loader,
    choices,
    version;

  const list = await readdir(dirs.download);

  if (list.length === 0) {
    throw new Error(`There is no any scaffolds in your local folder ${dirs.download}, install it`);
  }

  answers = await inquirer.prompt([
    {
      type   : 'list',
      name   : 'scaffold',
      message: 'which scaffold do you want to update?',
      choices: list,
      async validate(input) {
        const done = this.async();

        if (input.length === 0) {
          done('You must choice one scaffold to update the version. If not update, Ctrl+C');
          return;
        }

        done(null, true);
      }
    }
  ]);

  const repo = answers.scaffold;

  loader = loading('tag list fetching', repo);
  const tags = await tagsList(repo);
  loader.succeed();

  if (tags.length === 0) {
    version = '';
  } else {
    choices = tags.map(({ name }) => name);

    answers = await inquirer.prompt([
      {
        type   : 'list',
        name   : 'version',
        message: 'which version do you want to install?',
        choices
      }
    ]);
    version = answers.version;
  }

  loader = loading('updating', repo);
  await download([repo, version].join('@'));
  loader.succeed();
}

export default apply
