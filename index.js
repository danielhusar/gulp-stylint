'use strict';
var gutil = require('gulp-util');
var spawn = require('win-spawn');
var through = require('through2');
var command = require.resolve('stylint').replace(/index\.js$/, 'bin/stylint');

module.exports = function (options, logger) {
	logger = logger || console.log;
	options = options || {};

	return through.obj(function (file, enc, cb) {

		if (file.isStream()) {
			this.emit('error', new gutil.PluginError('gulp-stylint', 'Streaming not supported'));
			cb();
			return;
		}

		var args = [file.path];
		if (options.config) {
			args.push('--config');
			args.push(options.config);
		}
		if (options.strict) {
			args.push('--strict');
		}

		var warnings = '';
		var lint = spawn(command, args);
		lint.stdout.setEncoding('utf8');
		lint.stderr.setEncoding('utf8');

		lint.stdout.on('data', function (data) {
			warnings = warnings + data.toString();
		});

		lint.stderr.on('data', function (data) {
			gutil.log('gulp-stylint: stderr:', data.toString());
		});

		lint.on('close', function (code) {
			if (code !== 0) {
				logger(warnings);
			}
			this.push(file);
			cb();
		}.bind(this));

	});

};
