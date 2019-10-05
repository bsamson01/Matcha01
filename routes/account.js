const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const saltRounds = 10;

const mongoose = require('mongoose');
const config = require('../config/database');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(config.database);

let db = mongoose.connection;
let User = require('../models/users');
db.once('open', function() {
    console.log("Connected");
});

const sendEmail = require("../config/mailer");

router.get('/', function(req, res, next) {
    res.redirect('/');
});

router.post('/register', function(req, res, next) {
    var username = req.body.username;
    var firstname= req.body.firstname;
    var lastname = req.body.lastname;
    var email = req.body.email;
    var password = req.body.password;
    var hashedpwd;

    User.find({username: username}, function(err, usr) {
        if (err) return handleError(err);
        if (usr.length != 0)
            console.log("username already exist");

        else {
            User.find({email: email}, function(err, mail) {
                if (err) return handleError(err);
                if (mail.length != 0)
                    console.log("Email already exists");
                else {
                    bcrypt.hash(password, saltRounds, function(err, salt) {
                        hashedpwd =  salt;
                        var code = Math.floor((Math.random() * 1000000) + 100000);
                        var usr = new User({firstname: firstname, lastname: lastname, username: username, email: email, password: hashedpwd, confirmcode: code});
                        usr.save();

                        var msg = "Hello " + username + "<br> Your confimation link is http://localhost:4000/account/verify?user=" + username + "&code=" + code;

                        var mailOptions = {
                            from: 'matchaapp6@gmail.com',
                            to: email,
                            subject: 'Matcha Registration',
                            text: msg
                        }
                        sendEmail(mailOptions);

                    });
                }
            });
        }
    });
    res.redirect('/');
});

router.get('/verify', function(req, res, next) {
    var username = req.query.user;
    var code = req.query.code;

    User.findOne({username: username}, function(err, user) {
        if (err) console.log("user not found");
        else {
            User.findOneAndUpdate({username: user.username}, {"$set": {verified: true}})
            .exec(function(err, user){
                if (err)
                    console.log("Cant update");
                else {
                    console.log("updated");
                    res.redirect('/');
                }
                    
            });
        }
    });
});

router.post('/login', function(req, res, next) {
    var password = req.body.password;
    var username = req.body.username;
    var correctpwd = false;

    User.findOne({username: username}, function(err, usr) {
        if (err) return handleError(err);
        else {
            if (usr ==  null)
                console.log("empty");
            else {
                bcrypt.compare(password, usr.password, function(err, res) {
                    if (res) {
                        req.session.user = usr;
                        req.session.save();
                        correctpwd = true;
                    }
                    else
                        correctpwd = false;
                });
            }
            correctpwd == true ? res.redirect('/fill-details') : res.redirect('/');          
        }
    })
})

router.post('/infoupdate', function(req, res, next) {

    User.findOneAndUpdate({"username" : req.session.user.username}, {"$set" : req.body})
    .exec(function(err, user) {
        if (err) {
            console.log(err);
            res.status(500).send(err);
            res.redirect('/');
        }
        else {
            User.findOne({username: user.username}, function(err, usr) {
                if (err) console.log(err);
                else {
                    req.session.user = usr;
                    req.session.save;
                    console.log(req.session.user);
                    res.redirect('/');     
                }
            })  
        }
    })
})

module.exports = router;