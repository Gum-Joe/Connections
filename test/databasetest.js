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
		var connect = function () {
	mongoose.connect('mongodb://localhost:27017/connections');

db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  // yay!
  console.log("Yay! We succefully connected to the db");
});
}
connect();
done();
	});
	
	it('Can we connect Store Data?', function (done) {
    var testSchema = new mongoose.Schema({
  name: { type: String }
, date: String
, testtype: String
});
var exits = false;
var test = mongoose.model('test', testSchema);

	mongoose.connect('mongodb://localhost:27017/connections');

db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  // yay!
  console.log("Yay! We succefully connected to the db");
});
var name = "test-" + Date();
    var date = Date();
    var typet = "git-PC-" + Date();

        var signupuser = new test({
  name: name
, date: date
, testtype: typet
});

/*
user.findOne({ username: susername }, function(err, signupuser) {
  if (!err){
      console.log("User tried to signup taken username");
      exits = true;
      res.render("signupREAL.ejs");
  };
});
*/



signupuser.save(function(err, signupuser) {
  if (err){
      return console.error("Errors storing DATA: " + err );
      throw Error;
  } else {
      console.log("Done");
      
  } 
    });
    
    // later
    /// bcrypt.genSalt(10, function(err, salt) {
    // for later pass = bcrypt.hash(res.body.pass, salt, function(err, hash) {
        // Store hash in your password DB. 
    // });
    // });
    // db.collection('users').insertOne({ "username": susername, "email": semail, "password": pass });

    console.log("Sign Up succesful");
    console.log("Storing...");
    done();
});




	});
	
	// store data
 

