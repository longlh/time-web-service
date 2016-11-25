'use strict';

var nock = require('nock');
var request = require('supertest');
var constants = require('./const');

describe('app', function() {
	var app = require('./app');

	afterEach(function() {
		nock.cleanAll();
	});

	it('GET / should respond JSON', function(done) {
		nock(constants.GET_TIME_HOST)
			.get(constants.GET_TIME_URL)
			.reply(200, '<timestamp time="1480074262069339" delay="0"/>');

		request(app)
			.get('/')
			.expect('Content-Type', /json/)
			.expect(200, done);
	});

	it('GET / should respond expected JSON', function(done) {
		nock(constants.GET_TIME_HOST)
			.get(constants.GET_TIME_URL)
			.reply(200, '<timestamp time="1480074262069339" delay="0"/>');

		request(app)
			.get('/')
			.expect('Content-Type', /json/)
			.expect(200, {
				utc: 1480074262069.339,
				iso: '2016-11-25T11:44:22.069Z',
				text: 'Fri Nov 25 2016 11:44:22 GMT+0000',
			}, done);
	});

	it('GET /?offset=7 should respond expected JSON', function(done) {
		nock(constants.GET_TIME_HOST)
			.get(constants.GET_TIME_URL)
			.reply(200, '<timestamp time="1480074262069339" delay="0"/>');

		request(app)
			.get('/?offset=7')
			.expect('Content-Type', /json/)
			.expect(200, {
				utc: 1480074262069.339,
				iso: '2016-11-25T11:44:22.069Z',
				text: 'Fri Nov 25 2016 18:44:22 GMT+0700',
			}, done);
	});

	it('GET / should respond 500 if time.gov is unavailable', function(done) {
		nock(constants.GET_TIME_HOST)
			.get(constants.GET_TIME_URL)
			.reply(404);

		request(app)
			.get('/?offset=7')
			.expect(500, done);
	});
});
