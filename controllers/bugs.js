var pool    = require('../config/database.js');
var express = require('express');
var router  = express.Router();

router.get('/', function(req, res) {
  res.render('bugs', {
    title: 'Report a bug',
    connected: req.session.user !== undefined
  });
});

router.post('/', function(req, res) {
  console.log(req);
  console.log(req.body);
  var description = req.body.desc_bug;
  pool.getConnection(function( err, connection ) {
    if (err) {
      res.sendStatus( 500 ); return ;
    }
    connection.query("INSERT INTO bugs (user, description) VALUES(?, ?)",  [ req.session.user, description ],  function(err, rows) {
      if (err) {
        connection.release();
      }
      else {
        console.log('success bugs');
        connection.release();
      }
    })
  });
  res.redirect('/account');
});

module.exports = router;