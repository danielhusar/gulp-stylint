'use strict';
var path = require('path');
var gutil = require('gulp-util');
var through = require('through2');
var spawn = require('win-spawn');
var command = path.join(__dirname, 'node_modules/stylint/bin/stylint');

module.exports = function (options, logger) {
	logger = logger || console.log;
	options = options || {};

	return through.obj(function (file, enc, cb) {

		if (file.isStream()) {
			this.emit('error', new gutil.PluginError('gulp-stylint', 'Streaming not supported'));
			cb();
			return;
		}

		var args = [];
		args.push(file.path);

		if (options.config) {
			args.push('--config');
			args.push(options.config);
		}

		if (options.strict) {
			args.push('--strict');
		}

		var lint = spawn(command, args);
		var warnings = '';

		lint.stdout.on('data', function (data) {
			warnings = warnings + data.toString();
		});

		lint.stderr.on('data', function (data) {
			gutil.log('gulp-stylint: stderr:', data.toString());
		});

		lint.on('close', function (data) {
			logger(warnings);
			this.push(file);
			cb();
		}.bind(this));

	});
};
