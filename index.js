'use strict';
var path = require('path');
var gutil = require('gulp-util');
var through = require('through2');
var spawn = require('win-spawn');
var command = path.join(__dirname, 'node_modules/stylint/bin/stylint');

module.exports = function (options, logger) {
	logger = logger || console.log;

	return through.obj(function (file, enc, cb) {
		if (file.isNull()) {
			this.push(file);
			cb();
			return;
		}

		if (file.isStream()) {
			this.emit('error', new gutil.PluginError('gulp-stylint', 'Streaming not supported'));
			cb();
			return;
		}

		var args = [];
		args.push(file.path);

		for (var key in options) {
			args.push('--' + key);
			args.push(options[key]);
		}

		var lint = spawn(command, args);
		var warnings = '';

		lint.stdout.on('data', function (data) {
			warnings = warnings + data.toString();
		});

		lint.stdout.on('end', function (data) {
			logger(warnings);
			this.push(file);
			cb();
		}.bind(this));

		lint.stderr.on('error', function (data) {
			gutil.log('gulp-stylint: stderr:', data);
		});

	});
};
