'use strict';

var express = require('express');
var app = module.exports = express();

app.get('/',
	require('./middlewares/get-time-from-time-gov'),
	require('./middlewares/parse-xml-response-to-utc'),
	require('./middlewares/format-time-response'),
	function(req, res, next) {
		res.json(req._time);
	});

app.use(function(err, req, res, next) {
	res.status(500).end();
});
