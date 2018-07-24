import consolidate from 'consolidate'

const renderContent = consolidate.swig.render

export default function render() {
  return function _render(files, metalsmith, next) {
    // answers
    const meta = metalsmith.metadata()
    /* eslint-disable */

    Object.keys(files).forEach(function(file){
      const str = files[file].contents.toString();

      renderContent(str, meta, (err, res) => {
        if (err) {
          return next(err)
        }

        files[file].contents = new Buffer(res)
        next();
      });
    })

  }
}
