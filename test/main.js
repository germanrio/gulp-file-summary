var summary = require('../lib'),
    test = require('./test-stream'),
    path = require('path'),
    chai = require('chai'),
    expect = chai.expect,
    assert = require('stream-assert'),
    gutil = require('gulp-util'),
    PluginError = gutil.PluginError,
    File = gutil.File;

describe('gulp-file-summary', function () {
  describe('summary()', function () {
    it('should throw, when arguments is missing', function () {
      expect(summary).to.throw('Missing filename option for gulp-file-summary');
      expect(summary.bind(null, {})).to.throw('Missing filename');
    });

    it('should ignore null files', function (done) {
      var stream = summary({filename: 'test.js'});
      stream
        .pipe(assert.length(0))
        .pipe(assert.end(done));
      stream.write(new File());
      stream.end();
    });

    it('should not fail if no files were input', function(done) {
      var stream = summary({filename: 'test.js'});
      stream
        .pipe(assert.end(done));
      stream.end();
    });

    it('should emit error on streamed file', function (done) {
      test(true, 'one', 'two')
        .pipe(summary({filename: 'test.js'}))
        .on('error', function (err) {
          expect(err.message).to.be.equal('Streaming not supported');
          done();
        });
    });

    it('should summary one file', function (done) {
      test('one')
        .pipe(assert.length(1))
        .pipe(summary({filename: 'test.js'}))
        .pipe(assert.length(1))
        .pipe(assert.first(function (f) { expect(f.contents.toString()).to.be.equal('/one.js'); }))
        .pipe(assert.end(done));
    });

    it('should summary multiple files', function (done) {
      test('one', 'two')
        .pipe(assert.length(2))
        .pipe(summary({filename: 'test.js'}))
        .pipe(assert.length(1))
        .pipe(assert.first(function (f) { expect(f.contents.toString()).to.be.equal('/one.js\n/two.js'); }))
        .pipe(assert.end(done));
    });

    it('should take path from process', function (done) {
      test('one', 'two')
        .pipe(assert.length(2))
        .pipe(summary({filename: 'test.js'}))
        .pipe(assert.length(1))
        .pipe(assert.first(function (f) { expect(f.path).to.be.equal(path.join(process.cwd(), 'test.js')); }))
        .pipe(assert.end(done));
    });

    describe('options', function () {
      it('should support glue', function (done) {
        test('one', 'two')
          .pipe(assert.length(2))
          .pipe(summary({filename: 'test.js', glue: ', '}))
          .pipe(assert.length(1))
          .pipe(assert.first(function (d) { expect(d.contents.toString()).to.be.equal('/one.js, /two.js'); }))
          .pipe(assert.end(done));
      });

      it('should not use glue when only one file', function (done) {
        test('one')
          .pipe(assert.length(1))
          .pipe(summary({filename: 'test.js', glue: ', '}))
          .pipe(assert.length(1))
          .pipe(assert.first(function (d) { expect(d.contents.toString()).to.be.equal('/one.js'); }))
          .pipe(assert.end(done));
      });

      it('should support template', function (done) {
        test('one', 'two')
          .pipe(assert.length(2))
          .pipe(summary({filename: 'test.js', template: '**%f**'}))
          .pipe(assert.length(1))
          .pipe(assert.first(function (d) { expect(d.contents.toString()).to.be.equal('**/one.js**\n**/two.js**'); }))
          .pipe(assert.end(done));
      });
    });
  });
});
