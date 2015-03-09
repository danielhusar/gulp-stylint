'use strict';
var assert = require('assert');
var gutil = require('gulp-util');
var sinon = require('sinon');
var stylint = require('./');

it('It should log zero units', function (cb) {
	var log = sinon.spy();
	var stream = stylint({}, log);

	stream.on('data', function (file) {
		assert(true);
	});

	stream.on('end', function () {
		var warnings = log.getCall(0).args[0].split('\n');

		assert.equal(warnings[0].trim(), 'Warning:  0 is preferred. Unit value is unnecessary');
		assert.equal(warnings[1].trim(), 'File: fixtures/units.styl');
		assert.equal(warnings[2].trim(), 'Line: 2: margin: 0px');
		cb();
	});

	stream.write(new gutil.File({
		base: __dirname,
		path: __dirname + '/fixtures/units.styl',
		contents: new Buffer('')
	}));

	stream.end();
});


it('It should log zero units and colon warning with custom options', function (cb) {
	var log = sinon.spy();
	var stream = stylint({
		config: 'fixtures/.configrc'
	}, log);

	stream.on('data', function (file) {
		assert(true);
	});

	stream.on('end', function () {
		var warnings = log.getCall(0).args[0].split('\n');
		assert.equal(warnings[0].trim(), 'Warning:  unecessary colon found:');
		assert.equal(warnings[1].trim(), 'File: fixtures/units.styl');
		assert.equal(warnings[2].trim(), 'Line: 2: margin: 0px');

		warnings = log.getCall(1).args[0].split('\n');
		assert.equal(warnings[0].trim(), 'Warning:  0 is preferred. Unit value is unnecessary');
		assert.equal(warnings[1].trim(), 'File: fixtures/units.styl');
		assert.equal(warnings[2].trim(), 'Line: 2: margin: 0px');

		cb();
	});

	stream.write(new gutil.File({
		base: __dirname,
		path: __dirname + '/fixtures/units.styl',
		contents: new Buffer('')
	}));

	stream.end();
});
