import Metalsmith from 'metalsmith';
import render from './render';

async function apply (src, dest, answers) {
  const metalsmith = Metalsmith(src);

  // metalsmith(json) get the global metadata,

  return new Promise((resolve, reject) => {
    metalsmith
	  .metadata(answers)
      .source('./')
      .destination(dest)
      .clean(false)
      .use(render())
      .build((err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(true);
      });
  });
}

export default apply