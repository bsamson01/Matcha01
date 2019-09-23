$('#myBtn').on('click', function(){
    $('#myModal').css("display", "block");
});

$('.close').first().on('click', function() {
    $('#myModal').css("display", "none");
});

window.onclick = function(evt) {
    if (evt.target == $("#myModal")) {
        $('#myModal').css("display", "none");
    }
}