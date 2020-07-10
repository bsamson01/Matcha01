var pool    = require('../config/database.js');
var express = require('express');
var router  = express.Router();

  /**
   * Display Home Page
  **/
  router.get('/', function(req, res) {
    if (req.session.user !== undefined) {
    
    pool.getConnection(function(err, connection) {
      if (err) { res.sendStatus( 500 ); return ; }
      
      connection.query('SELECT * FROM tags', function (err, rows) {
        res.render('index', {
          title: 'Home',
          connected: req.session.user !== undefined,
          tags: rows
        });
        connection.release();
      });
    });
    
    
  } else {
    res.render('index', {
      title: 'Home',
      message: 'Your header message',
      connected: req.session.user !== undefined,
      userName: (req.user) ? req.user.username : undefined
    });
  }
  
  });


module.exports = router;