const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(config.database);
let db = mongoose.connection;

db.once('open', function(){
    console.log("Connected");
});

var sess;

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
    res.render("index", {
        pageName : "index",
        user: req.session.user
    });
});

app.get('/fill-details', function(req,res,next) {
    res.render("fill-details", {
        pageName : "fill-details",
        user: req.session.user
    });
});

app.post('/fill-details', function(req,res,next) {
    res.render("fill-details", {
        pageName : "fill-details",
        user: req.session.user
    });
});

app.get('/logout', function(req, res, next) {
    req.session.destroy();
    req.flash('success', 'You are logged out');
    res.redirect('/');
    next();
});

app.listen(process.env.PORT || 4000 , function() {
    console.log("App is running");
});