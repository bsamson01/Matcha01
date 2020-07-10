var schedule  = require('node-schedule');
var events    = require('../config/event');
var async     = require('async');
var pool    = require('../config/database.js');

schedule.scheduleJob('*/1 * * * *', function() {
  var start = Date.now();
  
  pool.getConnection(function ( err, connection ) {
    if ( err ) return ;
    
    
    var total_visits;
    connection.query("SELECT COUNT(*) AS count FROM visits WHERE 1", [], function (err, rows) {
      total_visits = rows[0].count;
    }); 
    
    connection.query("SELECT * FROM users WHERE 1", function (err, rows) {
      
      total_users = rows.length;
      async.each(rows, function (user, callback) {
        connection.query("SELECT COUNT(*) AS count FROM visits where visit_target= ?", [user.id], function ( err, rows) {
          var result = total_visits/2 + rows[0].count;
          console.log("SCORE " + user.id + " : " + result);
          
          if (result < 0)
            result = 0;
          else if (result > 100)
            result = 100;
            
          connection.query("UPDATE users SET score = ? WHERE id = ?", [ result, user.id ], function (err, rows) {
            callback();
          });
        })
      }, function ( err) {
        console.log("FIN SCORES " + (Date.now() - start) + " ms");
      });
    });
    connection.release();
  });
});