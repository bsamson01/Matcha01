var express = require('express');
var router  = express.Router();
var async   = require('async');
var pool    = require('../config/database.js');
var events  = require('../config/event');
var moment  = require('moment');

router.post('/block', function( req, res ) {
  var id = req.body.id;

  if (id == undefined || id === req.session.user) {
   res.sendStatus( 400 ); return ;
  }

  pool.getConnection(function( err, connection ) {
    if ( err ) { res.sendStatus( 500 ); return ; }

    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    });

    connection.query("SELECT * FROM blocked_users WHERE user = ? AND blocked_target = ?", [ req.session.user, id ], function (err, rows) {
      if (rows.length == 0) {
        connection.query("INSERT INTO blocked_users (user, blocked_target) VALUES (?, ?)",  [req.session.user, id], function( err, rows) {
          if ( err ){
            res.sendStatus( 500 );
          }
        });

        connection.query("DELETE FROM matchs WHERE user = ? AND match_target = ?",  [req.session.user, id], function( err, rows) {
          if ( err )
            res.sendStatus( 500 );
          else {
            res.sendStatus( 201 );
            events.emit('user_unmatch', req.session.user, id);
          }
        });
      }
      else {
        connection.query("DELETE FROM blocked_users WHERE user = ? AND blocked_target = ?",  [req.session.user, id], function( err, rows) {
          if ( err )
            res.sendStatus( 500 );
          else
            res.sendStatus( 201 );
        });
      }
      connection.release();
    });
  });
});

router.post('/report', function( req, res ) {
   var id = req.body.id, reason = req.body.reason;
   
   if (id == undefined || reason == undefined || id === req.session.user) {
     res.sendStatus( 400 ); return ;
   }
   
   pool.getConnection(function( err, connection ) {
    if ( err ) { res.sendStatus( 500 ); return ; }
    
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    });
    
    connection.query("SELECT id FROM users WHERE id = ?", [ id ], function (err, rows) {
      if (rows.length == 0)
        res.sendStatus( 404 );
      else {
        connection.query("INSERT INTO reports (id, user, reported_target, type) VALUES (?, ?, ?, ?)", 
          [uuid, req.session.user, id, reason], function( err, rows) {
          if ( err )
            res.sendStatus( 500 );
          else
            res.sendStatus( 201 );
        });
      }
      connection.release();
    });
   });
});

router.post('/match', function( req, res ) {
   var id = req.body.id;
   
   if (id == undefined || id === req.session.user) {
     res.sendStatus( 400 ); return ;
   }
   
   pool.getConnection(function( err, connection ) {
    if ( err ) { res.sendStatus( 500 ); return ; }
    
    connection.query("SELECT * FROM matchs WHERE user = ? AND match_target = ?", [ req.session.user, id ], function (err, rows) {
      if (rows.length == 0) {
        connection.query("INSERT INTO matchs (user, match_target) VALUES (?, ?)",  [req.session.user, id], function( err, rows) {
          if ( err )
            res.sendStatus( 500 );
          else {
            res.sendStatus( 201 );
            events.emit('user_match', req.session.user, id);
          }
        });
      }
      else {
        connection.query("DELETE FROM matchs WHERE user = ? AND match_target = ?",  [req.session.user, id], function( err, rows) {
          if ( err )
            res.sendStatus( 500 );
          else {
            res.sendStatus( 201 );
            events.emit('user_unmatch', req.session.user, id);
          }
        });
      }
      connection.release();
    });
   });
});

router.post('/visit', function( req, res ) {
   var id = req.body.id;
   
   if (id == undefined) {
     res.sendStatus( 400 ); return ;
   }
   
   pool.getConnection(function( err, connection ) {
    if ( err ) { res.sendStatus( 500 ); return ; }
    
    var sql = connection.query("SELECT * FROM visits WHERE visit_target = ? ORDER BY date DESC LIMIT 7", [ id ], function (err, rows) {
      async.each(rows, function (item, callback) {
        connection.query("SELECT * FROM users WHERE id = ?", [ item.user ],  function( err, rows ) {
          if (err) { callback( true ); return ; }
          
          item.user = rows[0].firstname + " " + rows[0].lastname;
          item.date = moment(item.date).fromNow();
          callback();
        });
      }, function ( err ) {
        if ( err )
          res.sendStatus( 500 );
        else 
          res.send(rows);
      });
    });
    connection.release();
   });
});

router.post('/likers', function( req, res ) {
   var id = req.body.id;
   
   if (id == undefined) {
     res.sendStatus( 400 ); return ;
   }
   
   pool.getConnection(function( err, connection ) {
    if ( err ) { res.sendStatus( 500 ); return ; }
    
    var sql = connection.query("SELECT * FROM matchs WHERE match_target = ? ORDER BY date DESC LIMIT 7", [ id ], function (err, rows) {
      async.each(rows, function (item, callback) {
        connection.query("SELECT * FROM users WHERE id = ?", [ item.user ],  function( err, rows ) {
          if (err) { callback( true ); return ; }
          
          item.user = rows[0].firstname + " " + rows[0].lastname;
          item.date = moment(item.date).fromNow();
          callback();
        });
      }, function ( err ) {
        if ( err )
          res.sendStatus( 500 );
        else 
          res.send(rows);
      });
    });
    connection.release();
   });
});

module.exports = router;