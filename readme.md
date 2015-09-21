# [gulp](http://gulpjs.com)-stylint [![Build Status](https://travis-ci.org/danielhusar/gulp-stylint.svg?branch=master)](https://travis-ci.org/danielhusar/gulp-stylint)

> Gulp plugin for stylus [stylint](https://github.com/rossPatton/stylint) linter


## Install

```sh
$ npm install --save-dev gulp-stylint
```


## Usage

```js
var gulp = require('gulp');
var stylint = require('gulp-stylint');

gulp.task('default', function () {
	return gulp.src('src/*.styl')
		.pipe(stylint())
		.pipe(stylint.reporter());
});
```

## Custom options

```js
var gulp = require('gulp');
var stylint = require('gulp-stylint');

gulp.task('default', function () {
	return gulp.src('src/*.styl')
		.pipe(stylint({config: '.stylintrc'}))
		.pipe(stylint.reporter());
});
```

## Reporters

### Standard
Standard reporter is just printing out the report created from `stylint` (possibly formatted by #reporter).

```js
var gulp = require('gulp');
var stylint = require('gulp-stylint');

gulp.task('default', function () {
	return gulp.src('src/*.styl')
		.pipe(stylint())
		.pipe(stylint.reporter());
});
```

#### Reporter options

##### logger
Type: `function`  
Default: `console.log`

Default warnings log function, you can use for example `gutil.log`.

```js
var gulp = require('gulp');
var stylint = require('gulp-stylint');

gulp.task('default', function () {
	return gulp.src('src/*.styl')
		.pipe(stylint())
		.pipe(stylint.reporter({ logger: gutil.log.bind(null, 'gulp-stylint:') }));
});
```

### Fail-reporter
Another reporter you can use is the `fail-reporter`. You can use it to fail the `gulp`-process in the case of linting-errors, or optionally warnings.

```js
var gulp = require('gulp');
var stylint = require('gulp-stylint');

gulp.task('default', function () {
	return gulp.src('src/*.styl')
		.pipe(stylint())
		.pipe(stylint.reporter())
		.pipe(stylint.reporter('fail'));
});
```

#### Fail-reporter options

##### failOnWarning
Type: `boolean`  
Default: `false`
If provided, fail the process not only on errors from `stylint`, but also on warnings.

```js
var gulp = require('gulp');
var stylint = require('gulp-stylint');

gulp.task('default', function () {
	return gulp.src('src/*.styl')
		.pipe(stylint())
		.pipe(stylint.reporter())
		.pipe(stylint.reporter('fail', { failOnWarning: true }));
});
```

## API

### stylint(options)

#### options
type: `object`

##### config

Type: `string`  
Default: `undefined`

Pass in path to custom rules configuration file as a string. If no configuration is passed in, it will use the `.stylintrc` file in the project root if present. If that file is not present, it will use default rules.

##### rules

type: `object`  
Default: `undefined`

Pass in an object with rules for `stylint` to lint by. This will override all default rules.

##### reporter

type: `string or object`  
Default: `undefined`

If using `rules`, and you want to use a custom reporter, you can pass in either a string with it's name, or an object containing both a string with the name, and options for it.  
If you only pass in `config`, this config can be placed in that file instead.

Example:
```js
gulp.task('default', function () {
  return gulp.src('src/*.styl')
    .pipe(stylint({
      rules: { semicolons: 'always' },
      reporter: {
        reporter: 'stylint-stylish',
        reporterOptions: {
          verbose: true
        }
      }
    }))
    .pipe(stylint.reporter());
}
```

__NOTE__: You must install the reporter yourself. E.g. `npm i -D stylint-stylish`.


## License

MIT © [Daniel Husar](https://github.com/danielhusar)
