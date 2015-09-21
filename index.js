'use strict';
var gutil = require('gulp-util');
var through = require('through2');
var stylint = require('stylint');

var failReporter = function (options) {
	options = options || {};

	var failOnWarning = options.failOnWarning;

	return through.obj(function (file, enc, cb) {
		if (file.stylint && (file.stylint.errors || (failOnWarning && file.stylint.warnings))) {
			return cb(new gutil.PluginError('gulp-stylint', 'Stylint failed for ' + file.relative), file);
		}

		this.push(file);
		cb();
	});
};

module.exports = function (options) {
	options = options || {};
	var reporter = options.reporter;
	var rules = options.rules;
	var reporterOptions;

	if (reporter) {
		if (typeof reporter === 'string') {
			reporter = require(reporter);
		} else if (typeof reporter === 'object') {
			reporterOptions = reporter.reporterOptions;
			reporter = require(reporter.reporter);
		}
	}

	return through.obj(function (file, enc, cb) {
		var that = this;

		if (file.isNull()) {
			return cb(null, file); // pass along
		}

		if (file.isStream()) {
			return cb(gutil.PluginError('gulp-stylint', 'Streaming not supported'), file);
		}

		stylint(file.path, rules)
			.methods({
				read: function () {
					this.cache.filesLen = 1;
					this.cache.fileNo = 1;
					this.cache.file = file.path;
					this.cache.files = [file.path];
					this.state.quiet = true;

					if (reporter) {
						this.reporter = reporter;
						this.config.reporterOptions = reporterOptions;
					}

					this.parse(null, [file.contents.toString(enc)]);
				},
				done: function () {
					var warningsOrErrors = [].concat(this.cache.errs, this.cache.warnings);

					if (warningsOrErrors.length) {
						var msg = warningsOrErrors.filter(function (str) {
							return !!str;
						}).join('\n\n');
						msg += '\n' + this.cache.msg;
						file.stylint = {msg: msg, errors: this.cache.errs.length > 0, warnings: this.cache.warnings.length > 0};
					}

					// HACK: reset stylint, since it accidentally shares global state
					this.resetOnChange();

					that.push(file);
					cb();
				}
			})
			.create({}, options);
	});
};

module.exports.reporter = function (reporter, options) {
	if (typeof reporter === 'string') {
		if (reporter === 'fail') {
			return failReporter(options);
		}

		throw new gutil.PluginError('gulp-stylint', reporter + ' is not a reporter');
	}

	var logger = (reporter || {}).logger || console.log;

	return through.obj(function (file, enc, cb) {
		if (file.stylint) {
			logger(file.stylint.msg);
		}

		this.push(file);
		cb();
	});
};
