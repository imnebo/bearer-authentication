module.exports = function (app) {


    /**
     * GET HOME PAGE
     *
     * */
    app.get('/', function (req, res, next) {
        console.log("in routes");
        res.sendFile('index.html');
    });

    /**
     * USER SIGNIN
     * body = {
 *      userEmail       : '',
 *      userPassword    : ''
 * }
     * */
    app.post('/signin', function (req, res, next) {
        app.db.models.User.findOne({userEmail: req.body.userEmail}, function (err, record) {
            if (err) {
                res.send({status: false, message: err.message});
            } else if (record) {
                if (record.userPassword == req.body.userPassword) {
                    res.redirect('gettoken');
                    console.log('GETTING TOKEN');
                    //res.send({status: true, data: record});
                } else {
                    res.send({status: false, message: 'Wrong Credentials!!'});
                }
            } else {
                res.send({status: true, message: 'User Not Found'});
            }
        })
    });

    /**
     * USER SIGNUP
     * body = {
 *      userFirstName   : '',
 *      userLastName    : '',
 *      userEmail       : '',
 *      userPassword    : ''
 * }
     * */
    app.post('/signup', function (req, res) {
        app.db.models.User.findOne({userEmail: req.body.userEmail}, function (err, record) {
            if (err) {
                res.send({status: false, message: err.message});
            } else if (record) {
                res.send({status: false, message: 'User Already Exist'});
            } else {
                var newUser = {
                    userFirstName: req.body.userFirstName,
                    userLastName: req.body.userLastName,
                    userEmail: req.body.userEmail,
                    userPassword: req.body.userPassword
                };
                var newuser = new app.db.models.User(newUser);
                newuser.save(function (err, data) {
                    if (err) {
                        res.send({status: false, message: err.message});
                    } else {
                        res.send({status: true});
                    }
                })
            }
        })

    });

    //app.get('*', function (req, res, next) {
    //    var err = new Error();
    //    err.status = 404;
    //    next(err);
    //});
    //
    //app.use(function (err, req, res, next) {
    //    if (err.status !== 404) {
    //        return next();
    //    }
    //    res.send('<h1>404</h1><p>Page Not Found</p>');
    //    //res.send(err.message || '** no unicorns here **');
    //});

    /**
     * UPDATE USER
     * body = {
 *      _id             : '',
 *      userFirstName   : '',
 *      userLastName    : '',
 *      userEmail       : '',
 *      userPassword    : ''
 * }
     * */
    app.post('/updateuser', function (req, res, next) {

        app.db.models.User.findOneAndUpdate({_id: req.body._id},
            {
                userFirstName: req.body.userFirstName,
                userLastName: req.body.userLastName,
                userEmail: req.body.userEmail,
                userPassword: req.body.userPassword
            }, function (err, data) {
                if (err)
                    res.send({status: false, message: err});
                else
                    res.send({status: true, data: data});
            });

    });
};