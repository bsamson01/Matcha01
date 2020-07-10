var express = require('express');
var session = require('express-session');
var sharedsession   = require("express-socket.io-session");
var morgan      = require('morgan');
var compression   = require('compression');
var fs      = require('fs');
var app     = express();
var server  = require('http').Server(app);
var io      = require('socket.io')(server);
var events      = require('./config/event');

var index   = require('./controllers/index');
var auth    = require('./controllers/auth');
var account    = require('./controllers/account');
var suggestions = require('./controllers/suggestions');
var search = require('./controllers/search');
var profile = require('./controllers/profile');
var user  = require('./controllers/user');
var map = require('./controllers/map');
var bugs = require('./controllers/bugs')

app.set('view engine', 'ejs')
.set('views', __dirname + '/views')
.set('trust_proxy', 1)

.use(express.static(__dirname + '/public'))
.use(express.static(__dirname + '/uploads'))

app.use(morgan('dev'))

app.use(compression())

.use(require('body-parser').urlencoded({ extended: true }))

var session_setup = session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
});

app.use(session_setup)

.use('/', index)
.use('/auth', auth)
.use('/search', function(req, res, next) {
  if (req.session.user == undefined) 
    res.redirect("/auth/signin");
  else
    next();
}, search)
.use('/account', function(req, res, next) {
  if (req.session.user == undefined) 
    res.redirect("/auth/signin");
  else
    next();
}, account)
.use('/map', function(req, res, next) {
  if (req.session.user == undefined) 
    res.redirect("/auth/signin");
  else
    next();
}, map)
.use('/suggestions', function(req, res, next) {
  if (req.session.user == undefined) 
    res.redirect("/auth/signin");
  else
    next();
}, suggestions)
.use('/profile', function(req, res, next) {
  if (req.session.user == undefined) 
    res.redirect("/auth/signin");
  else
    next();
}, profile)
.use('/user', function(req, res, next) {
  if (req.session.user == undefined) 
    res.redirect("/auth/signin");
  else
    next();
}, user)
.use('/bugs', function(req, res, next) {
  if (req.session.user == undefined) 
    res.redirect("/auth/signin");
  else
    next();
}, bugs)
.use(function(req, res, next){
    res.redirect('/');
});

var users = {};

io.use(sharedsession(session_setup));
require('./controllers/socket')(io, users);

require('./controllers/events')(users);

require('./controllers/workers');

var port = process.env.PORT || 3000;
server.listen(port);

module.exports = events;
