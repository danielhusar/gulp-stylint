/*jshint mocha:true*/

'use strict';

var assert = require('assert');
var fs = require('fs');
var path = require('path');
var gutil = require('gulp-util');
var sinon = require('sinon');
var chalk = require('chalk');
var stylint = require('./');
var stream;

function file (filenames) {
	var files = Array.isArray(filenames) ? filenames : [filenames];

	files.forEach(function (filename) {
		var pathToFile = path.resolve('fixtures', filename);

		stream.write(new gutil.File({
			path: pathToFile,
			contents: fs.readFileSync(pathToFile)
		}));
	});

	stream.on('data', function () {});

	stream.end();
}

it('It should not log if file is valid', function (cb) {
	var log = sinon.spy();
	stream = stylint({}, log);
	stream.on('end', function () {
		assert(!log.called);
		cb();
	});

	file('valid.styl');
});

it('It should log zero units', function (cb) {
	var log = sinon.spy();
	stream = stylint({}, log);
	stream.on('end', function () {
		var warnings = log.getCall(0).args[0].split('\n');
		assert.equal(warnings[0].trim(), 'Warning: unecessary semicolon found');
		assert.equal(warnings[4].trim(), 'Warning: 0 is preferred. Unit value is unnecessary');
		cb();
	});

	file('novalid.styl');
});

it('It should not log if file is valid with custom options', function (cb) {
	var log = sinon.spy();
	stream = stylint({
		config: 'config/.stylintrc'
	}, log);

	stream.on('end', function () {
		assert(!log.called);
		cb();
	});

	file('novalid.styl');
});

it('It should log if file is invalid with custom options', function (cb) {
	var log = sinon.spy();
	stream = stylint({
		config: 'config/.stylintrc'
	}, log);

	stream.on('end', function () {
		assert(log.called);
		cb();
	});

	file('valid.styl');
});

it('It should not log if file is valid with custom inline options', function (cb) {
	var log = sinon.spy();
	stream = stylint({
		rules: {
			colons: 'always',
			semicolons: 'always',
			zeroUnits: true
		}
	}, log);

	stream.on('end', function () {
		assert(!log.called);
		cb();
	});

	file('novalid.styl');
});

it('It should log if file is invalid with custom inline options', function (cb) {
	var log = sinon.spy();
	stream = stylint({
		rules: {
			colons: 'always',
			semicolons: 'always',
			zeroUnits: true
		}
	}, log);

	stream.on('end', function () {
		assert(log.called);
		cb();
	});

	file('valid.styl');
});

it('It should fail if option is provided', function (cb) {
	var log = sinon.spy();
	stream = stylint({
		failOnError: true
	}, log);

	stream.on('error', function (err) {
		assert.equal(err.message, 'Stylint failed for fixtures/novalid.styl');
		cb();
	});

	file('novalid.styl');
});

it('It should not explode with multiple files', function (cb) {
	var log = sinon.spy();
	stream = stylint({}, log);
	stream.on('end', function () {
		assert(!log.called);
		cb();
	});

	file(['valid.styl', 'valid.styl']);
});

it('It should accept custom reporter', function (cb) {
	var log = sinon.spy();
	stream = stylint({
		reporter: 'stylint-stylish'
	}, log);
	stream.on('end', function () {
		assert(log.called);
		var logCall = log.getCall(0).args[0].trim();
		var firstWarning = logCall.split('\n')[1].trim().replace(/\s\s+/g, ' ');

		assert.equal(chalk.stripColor(firstWarning), 'line 2: unecessary semicolon found');
		cb();
	});

	file('novalid.styl');
});

it('It should accept custom reporter with custom options', function (cb) {
	var log = sinon.spy();
	stream = stylint({
		reporter: {
			reporter: 'stylint-stylish',
			reporterOptions: {
				verbose: true
			}
		}
	}, log);
	stream.on('end', function () {
		assert(log.called);
		var logCall = log.getCall(0).args[0].trim();
		var firstWarning = logCall.split('\n')[1].trim().replace(/\s\s+/g, ' ');

		assert.equal(chalk.stripColor(firstWarning), 'line 2: unecessary semicolon found margin: 0px;');
		cb();
	});

	file('novalid.styl');
});
