module.exports = function (app) {
    /**
     * GET PRODUCTS LIST
     *
     *
     * */
    app.get('/product/get', function (req, res, next) {
        app.db.models.Product.find({}, function (err, list) {/*productUser: req.user._id*/
            if (err)
                res.send({status: false, message: err});
            else
                res.send({status: true, data: list});
        });
    });

    /**
     * ADD PRODUCT
     * user = {},
     * body = {
     *      productName : '',
     *      productType : '',
     *      productPrice : '',
     *      productUser : ''
     *      productQuantity : ''
     * }
     * */
    app.post('/product/add', function (req, res, next) {
        var newproduct = new app.db.models.Product(
            {
                productName: req.body.productName,
                productType: req.body.productType,
                productPrice: req.body.productPrice,
                // productUser: req.user._id,
                productQuantity: req.body.productQuantity
            });
        newproduct.save(function (err, data) {
            if (err) {
                res.send(err);
            } else {
                res.send(data);
            }
        })


    });


    /**
     * UPDATE PRODUCT
     * user = {},
     * body = {
     *      _id         : '',
     *      productName : '',
     *      productType : '',
     *      productPrice : '',
     *      productQuantity : ''
     * }
     * */
    app.post('/product/updateproduct', function (req, res, next) {

        console.log('updateproduct', req.body);
        app.db.models.Product.update({_id: req.body._id},
            {
                productName: req.body.productName,
                productType: req.body.productType,
                productPrice: req.body.productPrice,
                //productUser: req.user._id,
                productQuantity: req.body.productQuantity
            }, function (err, data) {
                if (err) {
                    res.send(err);
                } else {
                    console.log('updateproduct', data)
                    res.send(data);
                }
            });

    });
    /**
     * Remove PRODUCT
     * user = {},
     * body = {
     *      _id         : ''
     * }
     * */
    app.post('/product/removeproduct', function (req, res, next) {

        app.db.models.Product.findOneAndRemove({_id: req.body._id},
            function (err, data) {
                if (err) {
                    res.send(err);
                } else {
                    res.send(data);
                }
            });

    });
};