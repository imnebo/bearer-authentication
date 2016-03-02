$(document).ready(function () {
    if (localStorage.getItem('token')) {
        $('#signin').hide();
        $('#signup').hide();
        $('#logout').show();
        $('#products').show();
    }
    else {
        $('#products').hide();
        $('#logout').hide();
    }
    $("#logout").click(function () {
        localStorage.clear();
        $(location).attr('href','login.html')
    });

});