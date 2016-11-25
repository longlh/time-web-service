'use strict';

var should = require('should');

describe('format-time-response', function() {
	var formatTimeResponse = require('./format-time-response')

	it('should return correct object', function(done) {
		var req = {
			_utc: 1480074262069.339,
			query: {
				offset: '7',
			},
		};
		var next = function() {
			should.exist(req._time);
			req._time.utc.should.be.equal(1480074262069.339);
			req._time.iso.should.be.equal('2016-11-25T11:44:22.069Z');
			req._time.text.should.be.equal('Fri Nov 25 2016 18:44:22 GMT+0700');
			done();
		};

		formatTimeResponse(req, null, next);
	});

	it('should return correct object when offset omitted', function(done) {
		var req = {
			_utc: 1480074262069.339,
			query: {
			},
		};
		var next = function() {
			should.exist(req._time);
			req._time.utc.should.be.equal(1480074262069.339);
			req._time.iso.should.be.equal('2016-11-25T11:44:22.069Z');
			req._time.text.should.be.equal('Fri Nov 25 2016 11:44:22 GMT+0000');
			done();
		};

		formatTimeResponse(req, null, next);
	});

	it('should throw error when invalid inputs', function(done) {
		try {
			formatTimeResponse(null, null, function(err) {
				done(new Error('Not expected'));
			});
		} catch (err) {
			err.should.be.Error();
			done();
		}
	});
});
