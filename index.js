const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const http = require('http');
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require('connect-flash')());
app.use(session({
    secret: 'matcha',
    resave: true,
    saveUninitialized: true
}));

app.use(function(req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

app.get('*', function(req, res, next) {
    res.locals.user = req.user || null;
    next();
});
let account = require('./routes/account');

app.use('/account', account);

app.get('/', function(req,res,next) {
    res.render("index");
});

app.get('/updateProfile', function(req, res, next) {

});

http.Server(app).listen(3000, function() {
    console.log("HTTP server listening on port 3000");
});