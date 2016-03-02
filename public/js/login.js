$(document).ready(function () {
    $("#signin").click(function () {
        $.post("/signin", {
            userEmail: $("#userEmail").val(),
            userPassword: $("#userPassword").val()
        }, function (data, status) {
            if(status == 'success') {
                localStorage.setItem('token', data.access_token);
                $(location).attr('href','products.html');
                console.log("status", status);
                console.log("data", data);
            }else{
                console.log("status", status);
                console.log("data", data);
            }
        });
    });
});
