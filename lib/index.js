'use strict';

var path = require('path'),
    through = require('through2'),
    gutil = require('gulp-util'),
    PluginError = gutil.PluginError,
    File = gutil.File;

module.exports = function(opts) {
  var filePathList = [];
  opts = opts || {};

  if (!opts.filename || typeof opts.filename !== 'string') {
    throw new PluginError('gulp-file-summary', 'Missing filename option for gulp-file-summary');
  }

  // Opts defaults
  var filenamePlaceholder = '%f';
  opts.template = opts.template || filenamePlaceholder;
  opts.glue = opts.glue || '\n';

  function bufferContents(file, enc, cb) {
    // ignore empty files
    if (file.isNull()) {
      cb();
      return;
    }

    // we dont do streams (yet)
    if (file.isStream()) {
      this.emit('error', new PluginError('gulp-file-summary',  'Streaming not supported'));
      cb();
      return;
    }

    // add file path to the list
    filePathList.push(opts.template.replace(filenamePlaceholder, file.path));
    cb();
  }

  function endStream(cb) {
    // no files passed in, no file goes out
    if (!filePathList.length) {
      cb();
      return;
    }

    var joinedFile = new File({
      base: process.cwd(),
      path: path.join(process.cwd(), opts.filename),
      contents: new Buffer(filePathList.join(opts.glue), 'utf8')
    });

    this.push(joinedFile);
    cb();
  }

  return through.obj(bufferContents, endStream);
};
