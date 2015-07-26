'use strict';
var gutil = require('gulp-util');
var through = require('through2');
var stylint = require('stylint');

module.exports = function (options, logger) {
	logger = logger || console.log;
	options = options || {};
	var failOnError = options.failOnError;

	delete options.failOnError;

	if (Object.keys(options).length === 0) {
		options = undefined;
	}

	return through.obj(function (file, enc, cb) {
		var that = this;

		if (file.isNull()) {
			return cb(null, file); // pass along
		}
		if (file.isStream()) {
			return cb(gutil.PluginError('gulp-stylint', 'Streaming not supported'), file);
		}

		stylint(file.path, options)
			.methods({
				read: function () {
					this.cache.filesLen = 1;
					this.cache.fileNo = 1;
					this.cache.file = file.path;
					this.cache.files = [file.path];
					this.state.quiet = true;
					this.parse(null, [file.contents.toString(enc)]);
				},
				done: function () {
					var warningsOrErrors = [].concat(this.cache.errs, this.cache.warnings).filter(function(str) { return !!str; });

					// HACK: reset stylint, since it accidentally shares global state
					this.resetOnChange();

					if (warningsOrErrors.length) {
						var msg = warningsOrErrors.join('\n\n');
						msg += '\n' + this.cache.msg;
						logger(msg);
						if (failOnError) {
							cb(new gutil.PluginError('gulp-stylint', 'Stylint failed for ' + file.relative), file);
							return;
						}
					}

					that.push(file);
					cb();
				}
			})
			.create();
	});

};
