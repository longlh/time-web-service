'use strict';

var constants = require('./const');
var app = require('./app');

app.listen(constants.PORT,
	console.log.bind(console, 'API server start at :%d', constants.PORT));
