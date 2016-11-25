'use strict';

var xml2js = require('xml2js');

module.exports = function(req, res, next) {
	xml2js.parseString(req._xml, function(err, result) {
		if (err) {
			return next(err);
		}

		req._utc = +(result.timestamp.$.time) / 1000;
		next();
	});
};
