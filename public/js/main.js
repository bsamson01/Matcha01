var socket = io();
var chat_users = {};
var users_in_chat = Cookies.get('user_list');

if (users_in_chat == "false") {
  $('.box_body').slideToggle(0);
}

socket.on('new_message', function(data) {
  // $('#audio-popup').trigger('play');
  if (!$('#' + data.chat).is('div')) {
    //query the history of this chat
    socket.emit('get_history', { 'id': data.chat });
    
    // add the box
    var html = '<div id=' + data.chat + ' class="msg_box">';
    html+= '<div class="message_box_title">' + data.user + '<i style="float: right;">X</i></div>';
    html += '<div class="message_container"><div class="msg_body"></div>';
    html += '<div class="message_send_field"><textarea class="msg_input" rows="4"></textarea></div></div>';
    $('.message_box').before(html);
    
    // handle keypress on input
    $('.msg_input').keypress(function(event) {
      if (event.keyCode != 13) return ;
         
      event.preventDefault();
      var msg = $(this).val();
      $(this).val('');
      if(msg != '') {
        // emit the message
        var chatID = $($(this).parent().parent().parent()).attr('id');
        
        socket.emit('new_message', {
          'chat': chatID,
          'msg': msg
        });
        
        // add the html
        $($(this).parent().parent().children()[0]).append('<div class="msg_from_target">'+ msg +'</div>');
        // scroll to bottom
        $($(this).parent().parent().children()[0]).scrollTop($($(this).parent().parent().children()[0])[0].scrollHeight);
      }
    });
    
    // handle close window
    $('.message_box_title').click(function(event){
      $(this).parent().remove();
    });
  } else {
    var body = $('#' + data.chat + ' > .message_container').children()[0];
    // add the msg
    $(body).append('<div class="msg_from_me">'+ data.msg +'</div>');
    // scroll to bottom
    $(body).scrollTop($(body)[0].scrollHeight);
  }
});


$( "#submit_account" ).click(function() {
  var len = $("select[name='tag_user'] option:selected").length;
  if (len == 0) {
    alert("Select one tag at least !");
    return false;
  }
});

socket.on('alerts', function(data) {
  $('#alert_nbr').html(data.nbr);
});

socket.on('new_alerts', function(data) {
  var current = parseInt($('#alert_nbr').html());
  $('#alert_nbr').html(current + 1 + "");
});

// when we got the user list
socket.on('user_list', function (data) {
  for(var i = 0; i < data.length; i++) {
    chat_users[data[i].id] = data[i];
    var state = data[i].last_visit == "0000-00-00 00:00:00" ? "online" : "offline";
    $('.box_body').append('<div chatID="' + data[i].id + '"class="user_' + state +' chat_click">' + data[i].firstname + ' ' + data[i].lastname + ' </div>');
  }
  
  $('.chat_click').click(function (event) {
    var id = $(this).attr('chatID');
    // if the box doesnt already exist
    if (!$('#' + id).is('div')) {
      //query the history of this chat
      socket.emit('get_history', { 'id': id });
      
      // add the box
      var html = '<div id=' + id + ' class="msg_box">';
      html+= '<div class="message_box_title">' + event.target.innerHTML + '<i style="float: right;">X</i></div>';
      html += '<div class="message_container"><div class="msg_body"></div>';
      html += '<div class="message_send_field"><textarea class="msg_input" rows="4"></textarea></div></div>';
      $('.message_box').before(html);
      
      // handle keypress on input
      $('.msg_input').keypress(function(event) {
        if (event.keyCode != 13) return ;
         
        event.preventDefault();
        var msg = $(this).val();
        $(this).val('');
        if(msg != '') {
          // emit the message
          var chatID = $($(this).parent().parent().parent()).attr('id');
          
          socket.emit('new_message', {
            'chat': chatID,
            'msg': msg
          });
          
          // add the html
          $($(this).parent().parent().children()[0]).append('<div class="msg_from_target">'+ msg +'</div>');
          // scroll to bottom
          $($(this).parent().parent().children()[0]).scrollTop($($(this).parent().parent().children()[0])[0].scrollHeight);
        }
      });
        
      // handle close window
      $('.message_box_title').click(function(event){
        $(this).parent().remove();
      });
    }
  })
});

socket.on('get_history', function(data) {
  if (!$('#' + data.chat).is('div')) return ;
  
  var body = $('#' + data.chat + ' > .message_container').children()[0];
  for (var i = 0; i < data.msgs.length; i++) {
    if (data.msgs[i].user === data.user)
      $(body).prepend('<div class="msg_from_target">'+ data.msgs[i].msg +'</div>');
    else 
      $(body).prepend('<div class="msg_from_me">'+ data.msgs[i].msg +'</div>');
  }
  $(body).scrollTop($(body)[0].scrollHeight);
});

$(document).ready(function(){
  $('#alerts_list').hide();

    $('#send_bug').click(function() {
    // get user id in url
    var desc_bug = $('#desc_bug').val();
    if (desc_bug == ""){
      alert("Fill field !")
      return;
    }
    $.post("/bugs", { 'desc_bug': desc_bug } ).done(function(data) {
      alert("Sent !");
      
      setTimeout(function() {
        location.reload(true);
      }, 1000);
    }).fail(function( error ) {
      if (error.status == 400) 
        alert("IMPOSSIBLE !");
      else 
        alert(error.status + " " + error.responseText);
    });
  });

  // handle chat
  $('.box_header').click(function(){
    $('.box_body').is(":visible") ? $('.box_body').hide() : $('.box_body').show();
    if (users_in_chat === "true")
      users_in_chat = "false";
    else
      users_in_chat = "true";
    Cookies.set('user_list', users_in_chat), { expires: 7 };
  });

  
  $('#visits_list').hide(); 
  // handle blocking
  $('#block_user').click(function() {
    // get user id in url
    var path = window.location.pathname.split('/');
    var user = path[path.length - 1];
    
    $.post("/user/block", { 'id': user } ).done(function(data) {
      alert("Success !");
      
      setTimeout(function() {
        location.reload(true);
      }, 1000);
    }).fail(function( error ) {
      if (error.status == 400) 
        alert("IMPOSSIBLE !");
      else 
        alert(error.status + " " + error.responseText);
    });
  });

  // handle reporting
  $('#send_report').click(function(event) {
    event.preventDefault();
    
    var cause = $("#report_cause").val();
    // get user id in url
    var path = window.location.pathname.split('/');
    var user = path[path.length - 1];
      $.post("/user/report", { 'id': user, 'reason': cause } ).done(function(data) {
      alert("Reported !");
    }).fail(function( error ) {
      if (error.status == 404) 
        alert("404 Error");
      else if (error.status == 400) 
        alert("IMPOSSIBLE !");
      else 
        alert(error.status + " " + error.responseText);
    });
  });

    // handle matching
  $('#match_user').click(function() {
    // get user id in url
    var path = window.location.pathname.split('/');
    var user = path[path.length - 1];
    
    $.post("/user/match", { 'id': user } ).done(function(data) {
      alert('Success !');
      
      setTimeout(function() {
        location.reload(true);
      }, 1000);
    }).fail(function( error ) {
      if (error.status == 400) 
        alert("Are you trying to match yourself ?");
      else 
        alert(error.status + " " + error.responseText);
    });
  });


  $('#suggestion_refresh').click(function() {

    var len = $("select[id='select_tags_suggest'] option:selected").length;
    if (len == 0) {
      alert("Select one tag at least !");
      return false;
    }

    var age_min = $("input[name='age_min']").val(), age_max = $("input[name='age_max']").val();
    var distance_min = $("input[name='distance_min']").val(), distance_max = $("input[name='distance_max']").val();
    var score_min = $("input[name='score_min']").val(), score_max = $("input[name='score_max']").val();
    var order_by = $("#order_by_suggest").val();

    // get the id for option
    var tmp = $("#select_tags_suggest").val();
    var interests = [];
    for(var i = 0; i < tmp.length; i++) {
      interests.push($( "option[value='" + tmp[i] + "']" ).attr('value'));
    }

    // reset already present
    $('#collection_suggest').hide();
    $("#collection_suggest").empty();
    $.post("/suggestions", {'age_min': age_min, 'age_max': age_max,
    'distance_min': distance_min, 'distance_max': distance_max, 'interests': interests, 
    'score_min': score_min, 'score_max': score_max, 'order_by': order_by} ).done(function(data) {
      $('#user_search').hide();
      $('#collection_suggest').show();
      $('<div class="row">').appendTo("#collection_suggest");
      for(var i = 0; i < data.length; i++) {
        if (data[i].picture == undefined || data[i].picture.length == 0) {
          data[i].picture = "default_image.png";
        }

        $('<div class="col-sm-6 col-md-4"><div class="thumbnail"><img src="http://127.0.0.1:3000/uploads/' + data[i].picture +'"><center><div class="caption"><h3 style="margin:0px;"">' + escape(data[i].firstname) + ' ' + escape(data[i].lastname) +'</h3><p>'+ escape(data[i].bio) + '</p><p><a href="/profile/' + data[i].id + '" class="btn btn-primary" role="button">Visit</a></p></div></div></center></div></div>').appendTo("#collection_suggest");
      }
    }).fail(function( error ) {
      $('#collection_suggest').hide();
    });

    event.preventDefault();
  });

  // // // // // // // // // // // // // // // // // // // // // // // // // // // 
  $("#title_sugg, #title_search").click(function() {
    $('#user_search').show();
    $("#collection_suggest, #collection_search").hide();
    $("#collection_suggest, #collection_search").empty();
  });
  // // // // // // // // // // // // // // // // // // // // // // // // // // // 
  // search user
  $('#search_refresh').click(function() {

    var len = $("select[id='select_tags_search'] option:selected").length;
    if (len == 0) {
      alert("Select one tag at least !");
      return false;
    }
    
    var name = $("#search_user").val() || "";
    var age_min = $("input[name='age_min']").val(), age_max = $("input[name='age_max']").val();
    var distance_min = $("input[name='distance_min']").val(), distance_max = $("input[name='distance_max']").val();
    var score_min = $("input[name='score_min']").val(), score_max = $("input[name='score_max']").val();
    var order_by = $("#order_by_suggest").val();
    
    
    // get the id for option
    var tmp = $("#select_tags_search").val();
    var interests = [];
    for(var i = 0; i < tmp.length; i++) {
      interests.push($( "option[value='" + tmp[i] + "']" ).attr('value'));
    }
      
    // reset already present
    $('#collection_search').hide();
    $("#collection_search").empty();
      
    $.post("/search", { 'name': name, 'age_min': age_min, 'age_max': age_max,
        'distance_min': distance_min, 'distance_max': distance_max, 'interests': interests, 
        'score_min': score_min, 'score_max': score_max, 'order_by': order_by} ).done(function(data) {
      $('#user_search').hide();
      $('#collection_search').show();
      for(var i = 0; i < data.length; i++) {
        if (data[i].picture == undefined || data[i].picture.length == 0) {
          data[i].picture = "default_image.png";
        }  
        $('<div class="col-sm-6 col-md-4"><div class="thumbnail"><img src="http://127.0.0.1:3000/uploads/' + data[i].picture +'"><center><div class="caption"><h3 style="margin:0px;"">' + escape(data[i].firstname) + ' ' + escape(data[i].lastname) +'</h3><p>'+ escape(data[i].bio) + '</p><p><a href="/profile/' + data[i].id + '" class="btn btn-primary" role="button">Visit</a></p></div></div></center></div></div>').appendTo("#collection_search");
      }
    }).fail(function( error ) {
      $('#collection_search').hide();
    });
      
    event.preventDefault();
  });
});

function load_visits_likes() {
  // get user id in url
  var path = window.location.pathname.split('/');
  var user = path[path.length - 1];
    
  if ($('#visits_list').is(":visible")) {
    $('#visits_list').hide();
    return;
  }

  // empty the alert list
  $('#visits_list').show();
  $('#visits_list').empty();
  
  $.post("/user/visit", { id: user }).done(function(data) {
    // add the alert to the list
    for(var i = 0; i < data.length; i++) {
      $('#visits_list').append('<br>' +
           data[i].user +' visited this profile.<span class="badge">' + data[i].date + '</span>');
    }
      
    }).fail(function( error ) {
      console.log(error.status + " " + error.responseText);
    });

  $.post("/user/likers", { id: user }).done(function(data) {
    // add the alert to the list
    for(var i = 0; i < data.length; i++) {
      $('#visits_list').append('<br>' +
           data[i].user +' liked this profile.<span class="badge">' + data[i].date + '</span>');
    }
      
    }).fail(function( error ) {
      console.log(error.status + " " + error.responseText);
    });
}

function load_alerts() {
  // empty the alert list
  $('#alerts_list').empty();
  $('#alerts_list').is(":visible") ? $('#alerts_list').hide() : $('#alerts_list').show();
  
  $.get("/account/alert").done(function(data) {
      // add the alert to the list
      for(var i = 0; i < data.length; i++) {
        var active = data[i].shown === 0 ? "active" : "";
        var color = data[i].displayed? "#5E5E5E" : "green";
        $('#alerts_list').append('<font color="' + color + '"><div id="id_' + data[i].id + '">' + data[i].message + '</div></font>');
      }
      // for each not seen setup hover
      $('[id^=id_]').click(function(event) {
        // he saw the alert
        socket.emit('alert_shown', {
          id: (this.id).toString().substring(3)
        });
        
          var current = parseInt($('#alert_nbr').html());
          if ($('#alert_nbr').text() != 0)
            $('#alert_nbr').html((current - 1) + "");
        
        $('#' + this.id).css('color', '#5E5E5E');
      });


    }).fail(function( error ) {
      if (error.status == 401)
        alert("Error 401");
      else
        alert(error.status + " " + error.responseText);
    });
}

function image_first(picture_name) {
  $.post("/account/image/first", {'picture_name': picture_name} ).done(function(data) {
    alert('Succes !');
    location.reload(true);
  }).fail(function( error ) {
    console.log(error);
    alert('Error !');
    });
}

function image_delete(picture_name) {
  $.post("/account/image/delete", {'picture_name': picture_name} ).done(function(data) {
    alert('Succes !');
    location.reload(true);
  }).fail(function( error ) {
    console.log(error);
    alert('Error !');
    });
}