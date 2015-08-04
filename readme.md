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

Type: `string` or `object`  
Default: `undefined`

Pass in path to custom rules configuration file as a string or include the rules inline as an object. If no configuration is passed in, it will use the `.stylintrc` file in the project root if present. If that file is not present, it will use default rules.

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
