var array = require('stream-array'),
    File = require('gulp-util').File;

module.exports = function () {
  var args = Array.prototype.slice.call(arguments);

  function create(name) {
    return new File({
      cwd: '/',
      base: '/',
      path: '/' + name + '.js',
      contents: new Buffer('contents'),
      stat: {mode: 0666}
    });
  }

  return array(args.map(create));
};
