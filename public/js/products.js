var _id, list = [];
$(document).ready(function () {
    if (localStorage.getItem('token')) {
        $('#logout').show();
        loadProducts();

    }else {
        $(location).attr('href','login.html')

    }
    $("#addBox, #editBox").hide();

    $("#logout").click(function () {
        localStorage.clear();
        $(location).attr('href','login.html')
    });

    $("#showAddProduct").click(function () {
        $("#addBox").show();
        $("#editBox").hide();
    });

    $(".cancel").click(function () {
        $("#addBox, #editBox").hide();
    });

    $("#addProduct").click(function () {
        $.post("/product/add", {
            productName: $("#productName").val(),
            productPrice: $("#productPrice").val(),
            productQuantity: $("#productQuantity").val()
        }, function (data, status) {
            if(status == 'success') {
                var txt1 = "<tr id='"+data._id+"'>" +
                    "<td>" + data.productName + "</td>" +
                    "<td>" + data.productPrice + "</td>" +
                    "<td>" + data.productQuantity + "</td>" +
                    "<td><input type='button' id='edit' name='edit'" +
                    " onclick='showEditProduct(" + JSON.stringify(data) + ")' value='edit'></td>" +
                    "<td><input type='button' name='delete' onclick='deleteProduct(\"" + data._id + "\" )' value='delete'></td>" +
                    "</tr>";
                $("#products").append(txt1);
                $("#productName,#productPrice, #productQuantity").val('')
                $("#addBox").hide();
            }else{
                console.log("status", status);
                console.log("data", data);
            }
        });


    });
    $("#editProduct").click(function () {
        var updatedObj = {
            _id: _id,
            productName: $("#editProductName").val(),
            productPrice: $("#editProductPrice").val(),
            productQuantity: $("#editProductQuantity").val()
        }
        $.post("/product/updateproduct", updatedObj, function (data, status) {
            if (status == 'success') {
                $("#editBox").hide();
                var txt1 = "<tr id='"+updatedObj._id+"'>" +
                    "<td>" + updatedObj.productName + "</td>" +
                    "<td>" + updatedObj.productPrice + "</td>" +
                    "<td>" + updatedObj.productQuantity + "</td>" +
                    "<td><input type='button' id='edit' name='edit'" +
                    " onclick='showEditProduct(" + JSON.stringify(updatedObj) + ")' value='edit'></td>" +
                    "<td><input type='button' name='delete' onclick='deleteProduct(\"" + updatedObj._id + "\" )' value='delete'></td>" +
                    "</tr>";
                $('#'+_id).after(txt1);
                $('#'+_id).remove();
                _id = null;
                $("#editProductName, #editProductPrice, #editProductQuantity").val('');
            } else {
                alert("status" + status)
                console.log("status", status);
                console.log("data", data);
            }
        });


    });

});
function showEditProduct(id){
    $("#editProductName").val(id.productName);
    $("#editProductPrice").val(id.productPrice);
    $("#editProductQuantity").val(id.productQuantity);
    _id = id._id;
    $("#addBox").hide();
    $("#editBox").show();

}
function deleteProduct(id){
    $.post("/product/removeProduct", {
        _id: id
    }, function (data, status) {
        if(status == 'success') {
            $('#'+id).remove();
        }else{
            console.log("status", status);
            console.log("data", data);
        }
    });
}
function loadProducts(){
    $.get("/product/get", function (responseTxt, statusTxt, xhr) {
        if (statusTxt == "success") {
            for (var i in responseTxt.data) {
                var txt1 = "<tr id='"+responseTxt.data[i]._id+"'>" +
                    "<td>" + responseTxt.data[i].productName + "</td>" +
                    "<td>" + responseTxt.data[i].productPrice + "</td>" +
                    "<td>" + responseTxt.data[i].productQuantity + "</td><td><input type='button' id='edit' name='edit'" +
                    " onclick='showEditProduct(" + JSON.stringify(responseTxt.data[i]) + ")' value='edit'></td>" +
                    "<td><input type='button' name='delete' onclick='deleteProduct(\"" + responseTxt.data[i]._id + "\" )' value='delete'></td>" +
                    "</tr>";
                $("#products").append(txt1);
            }
        }
        if (statusTxt == "error") {
            console.log("responseTxt", responseTxt);
            alert("Error: " + xhr.status + ": " + xhr.statusText);
        }
    });
}