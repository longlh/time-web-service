'use strict';

var moment = require('moment');

module.exports = function(req, res, next) {
	var offset = req.query.offset ? +req.query.offset : 0;
	var time = moment(req._utc).utcOffset(offset);

	req._time = {
		utc: req._utc,
		iso: time.toISOString(),
		text: time.toString(),
	};
	next();
};
