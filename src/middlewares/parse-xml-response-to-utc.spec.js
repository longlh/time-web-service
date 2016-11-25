'use strict';

var should = require('should');

describe('parse-xml-response-to-utc', function() {
	var parseXMLResponseToUTC = require('./parse-xml-response-to-utc');

	it('should parse XML response correctly', function(done) {
		var req = {
			_xml: '<timestamp time="1480074262069339" delay="0"/>',
		};
		var next = function() {
			req._utc.should.be.equal(1480074262069.339);
			done();
		};

		parseXMLResponseToUTC(req, null, next);
	});

	it('should parse XML response failed because of invalid response format', function(done) {
		var req = {
			_xml: 'incorrect xml format',
		};
		var next = function(err) {
			err.should.be.Error();
			done();
		};

		parseXMLResponseToUTC(req, null, next);
	});

	it('should parse XML response failed because of wrong XML response', function(done) {
		var req = {
			_xml: '<othertag time="1480074262069339" delay="0"/>',
		};

		try {
			parseXMLResponseToUTC(req, null, null);
		} catch (err) {
			err.should.be.Error();

			done();
		}
	});
});
