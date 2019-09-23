const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');
const session = require('express-session');
const config = require('./config/database');
const http = require('http');
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
// app.use(expressValidator({
//     errorFormatter: function(param, msg, value) {
//         var namespace = param.split('.'),
//         root = namespace.shift(),
//         formParam = root;

//         while(namespace.length){
//             formParam += '[' + namespace.shift() + ']';
//         }
//         return{
//             param : formParam,
//             msg : msg,
//             value : value
//         };
//     }
// }));

app.get('*', function(req, res, next) {
    res.locals.user = req.user || null;
    next();
});

let User = require('./models/users');
let account = require('./routes/account');

app.use('/account', account);

app.get('/', function(req,res,next){
    res.render("index");
});


http.Server(app).listen(3000, function() {
    console.log("HTTP server listening on port 3000");
});