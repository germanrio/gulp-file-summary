var array = require('stream-array'),
    File = require('gulp-util').File;

module.exports = function () {
  var args = Array.prototype.slice.call(arguments),
      isStream = false;

  // Check stream
  if (args.length && args[0] === true) {
    isStream = true;
    args.shift();
  }

  function create(name) {
    var file = new File({
      cwd: '/',
      base: '/',
      path: '/' + name + '.js',
      contents: new Buffer('contents'),
      stat: {mode: 0666}
    });

    if (isStream) {
      file.isStream = function () {
        return true;
      };
    }

    return file;
  }

  return array(args.map(create));
};
