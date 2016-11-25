'use strict';

var constants = require('../const');

var nock = require('nock');
var should = require('should');

describe('get-time-from-time-gov', function() {
	var getTimeFromTimeGov = require('./get-time-from-time-gov');

	afterEach(function() {
		nock.cleanAll();
	});

	it('should get actual time from time.gov', function(done) {
		nock(constants.GET_TIME_HOST)
			.get(constants.GET_TIME_URL)
			.reply(200, 'this is an xml response');

		var req = {

		};

		getTimeFromTimeGov(req, null, function() {
			req._xml.should.be.String();
			done();
		});
	});

	it('should throw error when cannot get 200 response from time.gov', function(done) {
		nock(constants.GET_TIME_HOST)
			.get(constants.GET_TIME_URL)
			.reply(500);

		getTimeFromTimeGov(null, null, function(err) {
			err.should.be.Error();

			done();
		});
	});
});
