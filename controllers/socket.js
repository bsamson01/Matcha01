var pool    = require('../config/database.js');
var http    = require('http');
var moment    = require('moment');
var async   = require('async');

module.exports = function(io, users) {
  io.on('connection', function (socket) {
    var id = socket.handshake.session.user;
    if (id != undefined) {
      
      users[id] = socket;
      
      pool.getConnection(function (err, connection) {
        if ( err ) { return ; }
        
        connection.query("SELECT COUNT(*) FROM user_alerts WHERE visitor = ? AND displayed = '0'", [id], function(err, rows) {
          socket.emit('alerts', { 'nbr': rows[0]['COUNT(*)'] });
        });
        
        
        connection.query("UPDATE users SET last_visit=? WHERE id = ?", [ '2017-01-01 16:35:39', id], function(err, rows) {
          if (err)
            console.log(err);
        });
        
        connection.query("SELECT id,lastname,firstname,picture,last_visit FROM `users` LEFT JOIN matchs ON user = ? AND reciprocal = '1' WHERE users.id = matchs.match_target",
                  [ id ], function (err, rows) {
          async.each(rows, function(item, callback) {
            connection.query("SELECT * FROM chats WHERE (user_1 = ? AND user_2 = ?) OR (user_1 = ? AND user_2 = ?)", [ id, item.id, item.id, id ], function(err, rows) {
              if (rows.length == 0) {
                var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                  var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                  return v.toString(16);
                });
                connection.query("INSERT INTO chats (id, user_1, user_2) VALUES (?, ?, ?)", [ uuid, id, item.id ], function (error, rows) {
                  item.id = uuid;
                  callback();
                });
              } else {
                item.id = rows[0].id;
                callback();
              }
            });
          }, function(err) {
            socket.emit('user_list', rows);
          });
        });
        
        connection.release();
      });
    }
    socket.on('new_message', function(data) {
      if (id != undefined || data.chat == undefined || data.msg == undefined) {
        pool.getConnection(function (err, connection) {
          if ( err ) { return ; }
          
          connection.query("SELECT * FROM chats WHERE id = ? AND (user_1 = ? OR user_2 = ?)", [ data.chat, id, id], function(err, rows) {
            if (rows.length == 0) return ;
            connection.query('INSERT INTO chat_msgs (id, user, msg) VALUES (?, ?, ?)', [ data.chat, id, data.msg ], function (err, rows) {}); 
            
            var other_guy;
            if (id === rows[0].user_1)
              other_guy = rows[0].user_2;
            else if (id === rows[0].user_2)
              other_guy = rows[0].user_1;
            
            if (users[other_guy] !== undefined) {
              connection.query('SELECT * FROM users WHERE id = ?', [ id ], function (err, rows) {
                users[other_guy].emit('new_message', {
                  'user': rows[0].firstname + " " + rows[0].lastname,
                  'chat': data.chat,
                  'msg': data.msg
                });
              });
            }
            else {
              connection.query("SELECT * FROM blocked_users WHERE user = ? AND blocked_target = ?", [ other_guy, id ], function (err, rows) {
                if (rows.length == 0) {
                  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                    return v.toString(16);
                  });
                  connection.query('SELECT * FROM users WHERE id = ?', [ id ], function (err, rows) {
                    if (rows.length > 0) {
                      var msg = rows[0].firstname + " " + rows[0].lastname + " sent you a message when you were offline.";
                      connection.query('INSERT INTO user_alerts (id, visitor, message) VALUES (?, ?, ?)', [ uuid, other_guy, msg ], function (err2, rows2) {});
                    }
                  }); 
                }
              });
            }
          });
          connection.release();
        });
      }
    })
    
    socket.on('alert_shown', function (data) {
      if (data.id != undefined && id != undefined) {
        pool.getConnection(function (err, connection) {
          if ( err ) { return ; }
          
          connection.query("SELECT * FROM user_alerts WHERE id = ?", [ data.id ],  function(err, rows) {
            if (rows.length > 0) {
              connection.query("UPDATE user_alerts SET displayed = '1' WHERE id = ?", [ data.id ],  function(err, rows) {});
            }
          });
          connection.release();
        });
      }
    });
    
    socket.on('get_history', function (data) {
      if (data.id === undefined || id === undefined) return ;
      
      pool.getConnection(function (err, connection) {
        if ( err ) { return ; }
          
        connection.query("SELECT * FROM chats WHERE id = ?", [ data.id ],  function(err, rows) {
          if (rows.length > 0 && (rows[0].user_1 === id || rows[0].user_2 == id)) {
            connection.query("SELECT * FROM chat_msgs WHERE id = ? ORDER BY date DESC LIMIT 20", [ data.id ],  function(err, rows) {
              socket.emit('get_history', {msgs: rows , user: id, chat: data.id });
            });
          }
        });
        connection.release();
      });
    });
    
    socket.on('disconnect', function () {
      if (id != undefined) {
        delete users[id]; 
        
        pool.getConnection(function (err, connection) {
          if ( err ) { return ; }
          
          connection.query("UPDATE users SET last_visit = NOW() WHERE id = ?", [ id], 
            function(err, rows) {
              if (err)
                console.log(err + " update lastvisite#socket");
          });
          
          connection.release();
        });
      }
    });
  });
}