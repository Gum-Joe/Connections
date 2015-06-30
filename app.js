var express = require('express');
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

var routes = require('./routes/index');
var users = require('./routes/users');

var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
// awaiting solve
// var bcrypt = require('bcrypt');

// custom mods
var connect = require("./private/connect.js");

var app = express();

// sign in schema

var userSchema = new mongoose.Schema({
  username: { type: String }
, email: String
, pwd: String
});
var exits = false;
var user = mongoose.model('user', userSchema);

//express config
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
// favicon = public
app.use(favicon(__dirname + '/public/favicon.jpg'));
app.use(express.static(path.join(__dirname, 'bower_components')));
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'public')));

connect.connect;
//app
app.get('/', function (req, res) {
	res.render('index.ejs');
});

app.get('/login', function (req, res) {
	res.render('signin.ejs');
});
app.get('/signup', function (req, res) {
	res.render('signupREAL.ejs');
});

var port = process.env.PORT || 8080;

app.listen(port, function () {
	console.log("Running on port " + port);
	console.log("The date and time is:", Date());
    console.log(connect.connect("Connect"));
} );


app.post('/signup', function (req, res) {
	//hash the password
    var susername = req.body.username;
    var semail = req.body.email;
    var pass = req.body.pass;
    
    var signupuser = new user({
  username: susername
, email: semail
, pwd: pass
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
  } else {
      console.log("Done");
      res.render('signin.ejs');
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
    
    
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error.jade', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error.ejs', {
        message: err.message,
        error: {}
    });
});


// functions

function connect(x) {
		var url = 'mongodb://localhost:27017/connections';
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server.");
  db.close();
});
}


