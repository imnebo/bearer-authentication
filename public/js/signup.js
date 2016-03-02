$(document).ready(function () {
    $("#signup").click(function () {
        $.post("/signup", {
            userFirstName: $("#userFirstName").val(),
            userLastName: $("#userLastName").val(),
            userEmail: $("#userEmail").val(),
            userPassword: $("#userPassword").val()
        }, function (data, status) {
            if(status == 'success') {
                console.log("status", status);
                console.log("data", data);
                $(location).attr('href','login.html');
            }else{
                console.log("status", status);
                console.log("data", data);
            }
        });
    });
});

