$('.register').on('click', function() {
    $('#myModal').css("display", "block");
});

$('.close').on('click', function() {
    $('#myModal').css("display", "none");
});

$('.login').on('click', function() {
    $('#myModal').css("display", "none");
});

window.onclick = function(evt) {
    if (evt.target == $("#myModal")) {
        $('#myModal').css("display", "none");
    }
}

var detailsform = $('#details-form');

detailsform.on('submit', function(e) {
    e.preventDefault;
    var info = {
        "bday" : $("input[name=bday]").val(), 
        "gender" : $("input[name=gender]").val(),
        "orientation" : $("input[name=orientation]").val(),
        "race" : $("input[name=race]").val(),
        "occupation" : $("input[name=occupation]").val(),
        "school" : $("input[name=school]").val(),
        "bio" : $("input[name=bio]").val(),
        "tagline" : $("input[name=tagline]").val(),
        "preforientation" : $("input[name=preforientation]").val(),
        "age" : getAge(),
        "addedDetails" : true
    }

    $.ajax({
        url: '/account/infoupdate',
        type: 'post',
        data: info,
    }).done(function(res) {
        console.log("done")
    })
})

$('#bday').change(function() {
    if(getAge() < 18)
        $(this).css("border", "solid red 2px");
    else
        $(this).css('border', "white")
})

function getAge() {
    var Bday = new Date($('#bday').val());
    return ~~((Date.now() - Bday) / (31557600000));
}

$("#encode").click(function() {
	var getval = $("#input").val();
		var result = $.base64.encode(getval)
  $("p").text(result);
});