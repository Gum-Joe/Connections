var mocha = require("mocha");

var path = require('path');
var bodyParser = require('body-parser');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');

// passport for login
var passport = require('passport');
var passportlocal = require('passport-local');
var passporthttp = require('passport-http');

var routes = require('../routes/index');
var users = require('../routes/users');

var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;


		var url = 'mongodb://localhost:27017/connections';
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Succesfully connected");
  db.close();
});

describe('Database tests', function () {
	it('Can we connect to the database?', function (done) {
		exports.connect = function () {
	mongoose.connect('mongodb://localhost:27017/connections');

db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  // yay!
  console.log("Yay! We succefully connected to the db");
});
}
done();
	});
	
	// store data
 
})
