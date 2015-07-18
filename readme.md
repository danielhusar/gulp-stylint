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
});
```

## Custom options

```js
var gulp = require('gulp');
var stylint = require('gulp-stylint');

gulp.task('default', function () {
	return gulp.src('src/*.styl')
		.pipe(stylint({config: '.stylintrc'}))
});
```


## API

### stylint(options, logger)

#### options
type: `object`

##### config

Type: `string`  
Default: `undefined`

Pass in location of custom config file

##### strict

Type: `boolean`  
Default: `undefined`

Run all tests, regardless of config

##### failOnError

Type: `boolean`  
Default: `undefined`

Fail the gulp-process if a warning is issued

#### logger

##### default logger function

Type: `function`  
Default: `console.log`

Default warnings log function, you can use for example `gutil.log.bind(null, 'gulp-stylint:');`


## License

MIT © [Daniel Husar](https://github.com/danielhusar)
