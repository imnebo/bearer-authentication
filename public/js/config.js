
$(document).ready(function() {

    $.ajaxSetup({
        beforeSend: function (xhr)
        {
            if(localStorage.getItem('token')){
                xhr.setRequestHeader("Authorization","Bearer " + localStorage.getItem('token'));
            }
        }
    });

});

