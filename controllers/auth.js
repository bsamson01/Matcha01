var pool    = require('../config/database.js');
var bcrypt    = require('bcryptjs');
var salt    = bcrypt.genSaltSync(10);
var express = require('express');
var router  = express.Router();
var mailsender  = require('./mail.js');

  /**
   *  Signup 
  **/
  router.get('/signup', function(req, res) {
    if (req.session.user !== undefined){
      res.redirect('/');
    } else {
      res.render('signup', {
        title: "Signup",
        connected: req.session.user !== undefined
      });
    }
  });

  router.post('/signup', function(req, res) {
    var mail = req.body.email, username = req.body.username, pwd = req.body.password, r_pwd = req.body.r_password, firstname = req.body.firstname, lastname = req.body.lastname;

    if (mail == undefined || username == undefined || pwd == undefined || r_pwd == undefined || firstname == undefined || lastname == undefined) {
      res.sendStatus(400); return ;
    }

    if (pwd !== r_pwd) {
      res.render('signup', {title: "Signup", error: "Password don't match !", connected: req.session.user !== undefined});
      return ;
    }

    if (pwd.length < 6) {
      res.render('signup', {title: "Signup", error: "Password too shors (6 chars minimum) !", connected: req.session.user !== undefined});
      return ;
    }

    pool.getConnection(function(err, connection) {
      if (err) {
        res.sendStatus(500); return ;
      }

      connection.query("SELECT * FROM users WHERE mail = ?",  [mail],  function(err, rows) {
        if (err || rows.length > 0) {
          res.render('signup', {title: "Signup", error: "Mail already exists in DB !", connected: req.session.user !== undefined});
          connection.release();
          return ;
        } else {
          var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
          });
          connection.query("INSERT INTO users (id, mail, username, password, firstname, lastname, status) VALUES (?, ?, ?, ?, ?, ?, ?)", 
          [uuid, mail, username, bcrypt.hashSync(pwd, salt), firstname, lastname, 'CONFIRMED'], function (err, rows) {
            if (err) {
              console.log(err);
            } 
            else {
              req.session.user = uuid;
              // res.sendStatus(200);
            }
            connection.release();
            res.redirect('/');
          });
        }
      });
    });
  });

  /**
   *  Signin 
  **/
  router.get('/signin', function(req, res) {
    if (req.session.user !== undefined){
      res.redirect('/');
    } else {
      res.render('signin', {
        title: "Signin",
        connected: req.session.user !== undefined
      });
    }
  });

  router.post('/signin', function(req, res) {
    var username = req.body.username, pwd = req.body.password
    if (username == undefined || pwd == undefined) {
      res.render('signin', {title: "Signin", error: "Fields empty", connected: req.session.user !== undefined});
      return ;
    }

    pool.getConnection(function(err, connection) {
      if (err) {
        res.sendStatus(500); return ;
      }

      connection.query("SELECT * FROM users WHERE username = ?", [ username ],  function(err, rows) {
        if (err || rows.length == 0) {
          res.render('signin', {title: "Signin", error: "User not in DB !", connected: req.session.user !== undefined});
          connection.release();
          return ;      
        }

        var state = bcrypt.compareSync( pwd, rows[0].password );
        
        if (state) {
          console.log("logged succes signin");
          req.session.user = rows[0].id;
          connection.release();
        } else {
          res.render('signin', {title: "Signin", error: "Incorrect password !", connected: req.session.user !== undefined});
          connection.release();
          return;
        }
        res.redirect('/');
      });
    });
  });

  /**
   * Logout
  **/
  router.get('/signout', function(req, res) {  
    pool.getConnection(function (err, connection) {
      if ( !err ) {
        connection.query("UPDATE users SET last_visit = NOW() WHERE id = ?", [ req.session.user ], function(err, rows) {});
       }
      req.session.destroy(function(err) {
        res.redirect('/');
      });
      connection.release();
    });
  });

  /**
   * Reset PWD
  **/
  router.get('/reset', function(req, res) {
    res.render('reset', {
      title: "Forgot password",
      connected: req.session.user !== undefined
    });
  });

  router.post('/reset', function(req, res) {
    var mail = req.body.email

    if (mail == undefined) {
      res.sendStatus(400); return ;
    }

    pool.getConnection(function(err, connection) {
      if (err) {
        res.sendStatus(500); return ;
      }
      connection.query("SELECT * FROM users WHERE mail = ?",  [ mail ],  function(err, rows) {
        if (rows.length == 0) {
          res.sendStatus(404);
        } else { 
          var pwd = Math.random().toString(36).slice(2);

          let mailOptions = {
              from: '"❤️ Matcha42" <brandon.samsonjnr@gmail.com>',
              to: rows[0].mail, 
              subject: '🔧 Reset your password !', 
              text: "🚷 Hello ! Here's your new password : " + pwd
          };

          mailsender.sendMail(mailOptions, (error, info) => {
              if (error) {
                  return console.log(error);
              }
              console.log('Message %s sent: %s', info.messageId, info.response);
          });

          res.redirect('/');

          connection.query("UPDATE users SET password = ? WHERE id = ?", [ bcrypt.hashSync(pwd, salt), rows[0].id ], function (err, rows) {});
        }
        connection.release();
      })
    });
  });

module.exports = router;