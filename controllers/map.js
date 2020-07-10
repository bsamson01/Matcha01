var pool    = require('../config/database.js');
var express = require('express');
var router  = express.Router();
var async     = require('async');
var http    = require('http');

router.get('/', function(req, res) {
  res.render('map', {
    title: 'Map',
    connected: req.session.user !== undefined
  });
});

router.post('/', function(req, res) {
  console.log(req);
  console.log(req.body);
  console.log(req.body.param1);

  pool.getConnection(function( err, connection ) {
    if (err) {
      console.log('err getconnexion account_location#update');
      res.sendStatus( 500 ); return ;
    }
    connection.query("UPDATE users SET location=? WHERE id = ?",  [ req.body.param1, req.session.user ],  function(err, rows) {
      if (err) {
        console.log('err connexion query account_location#update' + err);
        connection.release();
      }
      else {
        console.log('success account_location#update');
        connection.release();
      }
    })
  });
  res.redirect('/account');
});

module.exports = router;