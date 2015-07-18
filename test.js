'use strict';

var assert = require('assert');
var gutil = require('gulp-util');
var sinon = require('sinon');
var stylint = require('./');

var log = sinon.spy();
var stream;

function file (file) {
	stream.write(new gutil.File({
		base: __dirname,
		path: __dirname + '/fixtures/' + file,
		contents: new Buffer('')
	}));
	stream.on('data', function () {});
	stream.end();
}

it('It should not log if file is valid', function (cb) {
	stream = stylint({}, log);
	stream.on('end', function () {
		assert(!log.called);
		cb();
	});

	file('valid.styl');
});

it('It should log zero units', function (cb) {
	stream = stylint({}, log);
	stream.on('end', function () {
		var warnings = log.getCall(0).args[0].split('\n');

		assert.equal(warnings[0].trim(), 'Warning:  0 is preferred. Unit value is unnecessary');
		assert.equal(warnings[2].trim(), 'Line: 2: margin: 0px');
		cb();
	});

	file('novalid.styl');
});


it('It should log zero units and colon warning with custom options', function (cb) {
	stream = stylint({
		config: 'fixtures/.configrc'
	}, log);

	stream.on('end', function () {
		var warnings = log.getCall(1).args[0].split('\n');

		assert.equal(warnings[0].trim(), 'Warning:  unecessary colon found:');
		assert.equal(warnings[2].trim(), 'Line: 2: margin: 0px');
		assert.equal(warnings[4].trim(), 'Warning:  0 is preferred. Unit value is unnecessary');
		assert.equal(warnings[6].trim(), 'Line: 2: margin: 0px');
		cb();
	});

	file('novalid.styl');
});


it('It should fail if option is provided', function (cb) {
	stream = stylint({
		failOnError: true
	}, log);

	stream.on('error', function (err) {
		assert.equal(err.message, 'Stylint failed for fixtures/novalid.styl')
		cb();
	});

	file('novalid.styl');
});
