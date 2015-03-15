var async = require('async');
var express = require('express');
var debug = require('debug')('rps');
var app = express();

app.use( express.static( __dirname + '/view' ) );
app.use( express.static( __dirname + '/public' ) );

// var senderInfo = {
//   userName: '',
//   userIP: '',
//   userPort: ''
// };
// var eventObjTable = [];
// var db = [];
// var eventObj = '';

// var HOST = '127.1.1.1';
// var PORT80 = 80;
// var PORT8080 = 8080;

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
	res.sendFile('index.html');
});

module.exports = app;
