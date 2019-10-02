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
                        var usr = new User({firstname: firstname, lastname: lastname, username: username, email: email, password: hashedpwd});
                        usr.save();
                    });
                }
            });
        }
    });
    res.redirect('/');
});

router.post('/login', function(req, res, next) {
    var password = req.body.password;
    var username = req.body.username;
    var correctpwd = false;

    User.find({username: username}, function(err, usr) {
        if (err) return handleError(err);
        else {
            if (usr.length == 0)
                console.log("empty");
            else {
                bcrypt.compare(password, usr[0].password, function(err, res) {
                    if (res) {
                        req.session.user = username;
                        req.session.save();
                        console.log("correct password");
                        correctpwd = true;
                    }
                    else
                    {
                        console.log("incorrect password");
                        correctpwd = false;
                    }
                });
            }
                
        }
    }).then(function() {
        correctpwd == true ? res.redirect('/fill-details') : res.redirect('/');
    });
})

router.post('/infoupdate', function(req, res, next) {

    User.findOneAndUpdate({"username" : req.session.user}, {"$set" : req.body})
    .exec(function(err, user) {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        }
        else {
            // res.status(200).send(usr)
            console.log("done");
        }
    })
    console.log(req.session.user);

})


module.exports = router;