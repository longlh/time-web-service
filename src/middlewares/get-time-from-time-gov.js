'use strict';

var request = require('request');
var constants = require('../const');

module.exports = function(req, res, next) {
	request({
		method: 'get',
		url: constants.GET_TIME_HOST + constants.GET_TIME_URL,
	}, function(err, response, body) {
		if (err) {
			return next(err);
		}

		if (!response || (response.statusCode !== 200)) {
			return next(new Error(response.statusCode));
		}

		req._xml = body;
		next();
	});
};
