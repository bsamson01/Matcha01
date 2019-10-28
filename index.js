const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
const mongoose = require('mongoose');
const config = require('./config/database')

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(config.database);
let db = mongoose.connection;

db.once('open', function(){
    console.log("Connected");
});


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
    res.locals.user = req.session.user;
    next();
});
let account = require('./routes/account');
app.use('/account', account);

app.get('/', function(req,res,next) {
    if (req.session.user == null)
        res.render("index", {
            pageName : "index",
            user: req.session.user
        });
    else
        res.redirect('/path')
});

app.get('/fill-details', function(req,res,next) {
        res.render("fill-details", {
            pageName : "fill-details",
            user: req.session.user
        });
});

app.get('/path', function(req, res, next) {
    if (req.session.user == null)
        res.redirect('/');
    else if (req.session.user.addedDetails == false)
        res.redirect('/fill-details')
    else
        res.redirect('/home')
});

app.get('/home', function(req, res, next) {
    if (req.session.user && req.session.user.addedDetails == true)
        res.render("home", {
            pageName : "home",
            user: req.session.user
        })
    else
        res.redirect('/path')
});

app.get('/images', function(req,res,next) {
    res.render("images", {
        pageName : "images",
        user: req.session.user
    });
});

app.get('/logout', function(req, res, next) {
    req.session.destroy();
    res.redirect('/');
    next();
});

app.listen(process.env.PORT || 4000 , function() {
    console.log("App is running");
});
