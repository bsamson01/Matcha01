var express = require('express');
var router  = express.Router();
var async   = require('async');
var pool    = require('../config/database.js');

function distance(loc, loc1) {
  var loc2 = loc.split(','), loc3 = loc1.split(',');
  var lat1 = loc2[0], lon1 = loc2[1], lat2 = loc3[0], lon2 = loc3[1];
  var p = 0.017453292519943295, c = Math.cos;
  var a = 0.5 - c((lat2 - lat1) * p)/2 +  c(lat1 * p) * c(lat2 * p) *  (1 - c((lon2 - lon1) * p))/2;
  return 12742 * Math.asin(Math.sqrt(a));
}

Array.prototype.clean = function(deleteValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == deleteValue) {         
      this.splice(i, 1);
      i--;
    }
  }
  return this;
};

router.post('/', function( req, res ) {
  var name = '%' + req.body.name + '%' || '%';
  var age_min = req.body.age_min, age_max = req.body.age_max;
  var distance_min = req.body.distance_min, distance_max = req.body.distance_max;
  var score_min = req.body.score_min, score_max = req.body.score_max;
  var interests = req.body.interests || [];
  var order_by = req.body.order_by;
   
  if (name == undefined || age_min == undefined || age_max === undefined || distance_min == undefined || distance_max == undefined
    || score_min === undefined || score_max === undefined || interests === undefined) {
    res.sendStatus( 400 ); return ;
  }
   
  pool.getConnection(function( err, connection ) {
    if ( err ) { res.sendStatus( 500 ); return ; }
      connection.query('SELECT id,firstname,lastname,picture,age,location,score FROM users WHERE id = ?', [ req.session.user ], function (err, rows) {
        var requester = rows[0];
        connection.query('SELECT * FROM users WHERE firstname LIKE ? OR lastname LIKE ?', [name, name], function ( err, users ) {
          async.each(users, function(user, callback) {
            if ( user.location.length == 0 || distance(requester.location, user.location) < distance_min ||
              distance(requester.location, user.location) > distance_max) {
              delete users[users.indexOf(user)];
              callback();
            } 
            else if ( user.score < score_min || user.score > score_max) {
              delete users[users.indexOf(user)];
              callback();
            }
            else if ( user.age < age_min || user.age > age_max) {
              delete users[users.indexOf(user)];
              callback();
            }
            else if ( interests.length > 0) {
              connection.query('SELECT * FROM `user_tags` WHERE `user` = ? AND `tag` IN (?)', [ user.id, interests[0] ], 
                function ( err, rows) {
                if (rows.length == 0) {
                  delete users[users.indexOf(user)];
                }
                callback();
              })
            } else {
              callback();
            }
            connection.query("SELECT * FROM blocked_users WHERE user = ? AND blocked_target = ?", [ requester.id, user.id ], function (err, rows) {
              if (rows.length > 0) {
                delete users[users.indexOf(user)];
              }
            });
            connection.query("SELECT * FROM blocked_users WHERE user = ? AND blocked_target = ?", [ user.id, requester.id ], function (err, rows) {
              if (rows.length > 0) {
                delete users[users.indexOf(user)];
              }
            });
            if (user.id == requester.id ) {
              delete users[users.indexOf(user)];
            }
          }, function ( err ) {
            var returned_users = [];
            users.clean();
            
            if (users.length == 0) {
              connection.release();
              res.send( returned_users );
              return ;
            }
            
            async.each(users, function (item, callback) {
              if (item.picture == undefined || item.picture.length == 0) {
                returned_users.push( item );
                callback();
              }
              else {
                connection.query("SELECT * FROM images WHERE id = ?", [ item.picture ],  function( err, rows ) {
                  if (err) { returned_users.push( item ); callback( true ); return ; }
                  if ( rows.length > 0 ) {
                    item.picture = rows[0].img;
                    returned_users.push( item );
                  }
                  callback();
                });
              }
            }, function (err) {
              async.sortBy(returned_users, function(user, callback) {
                if (order_by === "tags") {
                  connection.query('SELECT DISTINCT * FROM `user_tags` WHERE user = ? AND tag IN ( SELECT tag FROM `user_tags` WHERE user = ?)',
                    [ user.id, requester.id], function ( err, rows) {
                    callback(null, (-rows.length));
                  });
                }
                else if (order_by === "distance") {
                  callback(null, distance(user.location, requester.location));
                }
                else if (order_by === "popularity") {
                  callback(null, -user.score);
                }
                else {
                  callback(null, 0);
                }
              }, function(err, result){
                connection.release();
                if (err) {
                  res.sendStatus( 404 );
                }
                res.send( result );
              });
            });
          });
        });
      })
  });
});

module.exports = router;