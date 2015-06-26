var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');

var passport = require('passport');
var passportlocal = require('passport-local');
var passporthttp = require('passport-http');

var routes = require('./routes/index');
var users = require('./routes/users');

var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var bcrypt = require('bcrypt');

var app = express();

// custom scripts
// var mod = require('./module');
// var login = require('./login.js');

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

mongoose.connect('mongodb://localhost:27017/connections');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  // yay!
  console.log("Yay! We succefully connected to the db");
});

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

app.listen("8080", function () {
	console.log("Running on port 8080");
	console.log("The date and time is:", Date());
    connect("ok");
} );

app.post('/signup', function (req, res) {
	//hash the password
    var username = res.body.username;
    var email = res.body.email;
    var pass;
    bcrypt.genSalt(10, function(err, salt) {
    pass = bcrypt.hash(res.body.pass, salt, function(err, hash) {
        // Store hash in your password DB. 
    });
    db.users.save({"username": username, "email": email, "password": pass});
});
    console.log("Sign Up succesful");
    console.log("Storing...");
    
    res.render('signin.ejs');
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


