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
    }));
}
```

__NOTE__: You must install the reporter yourself. E.g. `npm i -D stylint-stylish`.

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
