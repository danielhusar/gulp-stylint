# [4.0.0](https://github.com/danielhusar/gulp-stylint/compare/v3.0.0...v4.0.0) (2016-10-08)
## Breaking changes
* Bump underlying version of Stylint to 1.4.1, and lock it
  * See https://github.com/danielhusar/gulp-stylint/pull/28 for discussion on unlocking it

# [3.0.0](https://github.com/danielhusar/gulp-stylint/compare/v2.0.0...v3.0.0) (2015-08-12)
## Breaking changes
* Just piping the files through `gulp-stylint` does not print anything to the console, use the `stylint.reporter`-method

## Features
* Added a `fail`-reporter allowing you to fail the proecss on `error`. Optionally provide `{ failOnWarning: true }` as second option to alsow fail on warnings

# [2.0.0](https://github.com/danielhusar/gulp-stylint/compare/v1.1.10...v2.0.0) (2015-08-12)
## Breaking changes
* Config option only allows a string

## Features
* Pass custom rules to stylint using the `rules` option
* Add `reporter` option to supply a custom reporter. Usse this if you cannot have the reporter in `.stylintrc`
