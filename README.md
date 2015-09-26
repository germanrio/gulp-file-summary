# Gulp file summary

[![Build Status][travisImg]][travisUrl]
[![Coverage Status][coverallsImg]][coverallsUrl]
[![NPM Version][npmImg]][npmUrl]

[travisImg]: https://travis-ci.org/germanrio/gulp-file-summary.svg?branch=master
[travisUrl]: https://travis-ci.org/germanrio/gulp-file-summary

[coverallsImg]: https://img.shields.io/coveralls/germanrio/gulp-file-summary.svg
[coverallsUrl]: https://coveralls.io/r/germanrio/gulp-file-summary

[npmImg]: https://img.shields.io/npm/v/gulp-file-summary.svg
[npmUrl]: https://npmjs.org/package/gulp-file-summary

This plugin allows to create a **summary file** with the **absolute paths** of the files in the gulp pipe. It can be useful to create the list of files needed to be loaded for other tasks, e.g. tests.

The default configuration provide a summary where each file path is written in a different line. Some options are available to customize the file output and they are explained below.


## Index
* [Install](#install)
* [Use](#use)
  - [Options](#options)
* [Code testing](#code-testing)
  - [Code coverage](#code-coverage)
* [License](#license)


## Install
Install `gulp-file-summary` plugin with npm.

```
> npm install gulp-file-summary --save-dev
```


## Use
```javascript
var fileSummary = require('gulp-file-summary');

gulp.task('summary', function() {
  return gulp.src('./lib/*.js')
    .pipe(fileSummary({filename: 'jsSummary.txt'}))
    .pipe(gulp.dest('./dist/'));
});
```


### Options
Method expects and object as a parameter with the following properties:
* `filename`: Compulsory string where is defined the filename of the summary created.
* `template`: Optional string where a template can be set for each file path. The placeholder for the file path inside the template is `%f`.
  - Default value: `%f`
* `glue`: Optional string where a glue can be set to join the file paths when creating the summary.
  - Default value: `\n`


## Code testing
If you wanna test the code, follow these steps:

```
> git clone https://github.com/germanrio/gulp-file-summary.git
> cd gulp-file-summary
> npm install
> npm test
```
**Note:** Of course is needed to have properly installed node and npm.


### Code coverage
If you also want to see the code coverage of tests:

```
> npm run cov
```

It will generate a `coverage` folder with the coverage report.


## License
MIT

More details in the `LICENSE` file in root folder.
