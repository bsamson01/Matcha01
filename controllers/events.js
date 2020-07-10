var events  = require('../config/event');
var async   = require('async');
var pool    = require('../config/database.js');

module.exports = function (users) {

  events.on('user_visit', function (user, visited) {
    pool.getConnection(function( err, connection ) {
      if ( err ) { return ; }
      
      if (user === visited) {
        connection.release();
        return ;
      }
      
      connection.query("SELECT * FROM blocked_users WHERE user = ? AND blocked_target = ?", [ visited, user ], function (err, rows) {
        if (rows.length == 0) {
          connection.query("SELECT * FROM users WHERE id = ?", [ user ], function (err, rows) {
            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
              var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
              return v.toString(16);
            });
            var msg = rows[0].firstname + " " + rows[0].lastname + " has visited your profile";
            connection.query("INSERT INTO user_alerts (id,visitor,message) VALUES (?, ?, ?)", [ uuid, visited, msg ], function (err, rows) {});
          });
        }
      });
      connection.release();
    });
  });

  events.on('user_match', function (user, match_target) { 
    pool.getConnection(function( err, connection ) {
      if ( err ) { return ; }
      
      connection.query("SELECT * FROM matchs WHERE user = ? AND match_target = ?", [ match_target, user ], function (err, rows) {
        if (rows.length > 0) {
          connection.query("UPDATE matchs SET reciprocal = '1' WHERE match_target = ? AND user = ?", [ user, match_target ], function (err, rows) {});
          connection.query("UPDATE matchs SET reciprocal = '1' WHERE match_target = ? AND user = ?", [ match_target, user ], function (err, rows) {});
          
          connection.query("SELECT * FROM blocked_users WHERE user = ? AND blocked_target = ?", [ match_target, user ], function (err, rows) {
            if (rows.length == 0) {
              if (users[match_target] != undefined) 
                users[match_target].emit('new_alerts');
              
              var id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                return v.toString(16);
              });
              connection.query("SELECT firstname,lastname FROM users WHERE id = ?", [ user ], function (err, rows) {
                var msg = rows[0].firstname + " " + rows[0].lastname + " has matched you back";
                connection.query("INSERT INTO user_alerts (id, user, msg) VALUES (?, ?, ?)", [id, match_target, msg], function(err, rows) {});
              });
            }
          });
        }
        else {
          connection.query("SELECT * FROM blocked_users WHERE user = ? AND blocked_target = ?", [ match_target, user ], function (err, rows) {
            if (rows.length == 0) {
              if (users[match_target] != undefined) 
                users[match_target].emit('new_alerts');
              
              var id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                return v.toString(16);
              });
              connection.query("SELECT firstname,lastname FROM users WHERE id = ?", [ user ], function (err, rows) {
                var msg = rows[0].firstname + " " + rows[0].lastname + " matched you !";
                connection.query("INSERT INTO user_alerts (id, visitor, message) VALUES (?, ?, ?)", [id, match_target, msg], function(err, rows) {});
              });
            }
          });
        }
      });
      connection.release();
    });
  });

  // Event Match : Unmatch
  events.on('user_unmatch', function (user, unmatched) {
    pool.getConnection(function( err, connection ) {
      if ( err ) { return ; }
      
      connection.query("SELECT * FROM matchs WHERE user = ? AND match_target = ?", [ unmatched, user ], function (err, rows) {
        if (rows.length > 0) {
          connection.query("UPDATE matchs SET reciprocal = '0' WHERE match_target = ? AND user = ?", [ user, unmatched ], function (err, rows) {});
          
          connection.query("SELECT * FROM blocked_users WHERE user = ? AND blocked_target = ?", [ unmatched, user ], function (err, rows) {
            if (rows.length == 0) {
              if (users[unmatched] != undefined) 
                users[unmatched].emit('new_alerts');
              
              var id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                return v.toString(16);
              });
              
              connection.query("SELECT firstname,lastname FROM users WHERE id = ?", [ user ], function (err, rows) {
                var msg = rows[0].firstname + " " + rows[0].lastname + " no longer match you";
                connection.query("INSERT INTO user_alerts (id, visitor, message) VALUES (?, ?, ?)", [id, unmatched, msg], function(err, rows) {});
              });
            }
          });
        }
      });
      connection.release();
    });
  });



}