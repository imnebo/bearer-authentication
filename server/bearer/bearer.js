module.exports = function (app, bearer, moment) {
    bearer({
        //Make sure to pass in the app (express) object so we can set routes
        app: app,
        //Please change server key for your own safety!
        serverKey: "12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678",
        tokenUrl: '/signin', //Call this URL to get your token. Accepts only POST method
        extendTokenUrl: '/extendtoken', //Call this URL to get your token. Accepts only POST method
        cookieName: 'Authorization', //default name for getting token from cookie when not found in Authorization header
        createToken: function (req, next, cancel) {
            var username = req.body.username;

            app.db.models.User.findOne({userEmail: req.body.userEmail}, function (err, record) {
                if (err) {
                    // cancel({status: false, message: err.message});
                    cancel();
                    // res.send({status: false, message: err.message})
                } else if (record) {
                    if (record.userPassword == req.body.userPassword) {

                        next({
                            expire: moment(Date.now()).add('days', 1).format('YYYY-MM-DD HH:mm:ss'),
                            username: username,
                            contentType: req.get('Content-Type'),
                            ip: req.ip,
                            userAgent: req.header('user-agent'),
                            custom_id: '55555',
                            another: 'Some data you need in your token',
                            moreData: 'Some more data you need'
                        });

                    } else {
                        cancel();
                        // cancel({status: false, message: 'Wrong Credentials!!'});
                    }
                } else {
                    cancel();
                    // cancel({status: false, message: 'User Not Found'});
                }
            });
        },
        extendToken: function (req, next, cancel) {
            var token = req.authToken;
            if (token) {
                next({
                    expire: moment(Date.now()).add('days', 1).format('YYYY-MM-DD HH:mm:ss'),
                    username: token.username,
                    contentType: req.get('Content-Type'),
                    ip: req.ip,
                    userAgent: req.header('user-agent'),
                    custom_id: '55555',
                    another: 'Some data you need in your token',
                    moreData: 'Some more data you need'
                });
            } else {
                cancel();
            }
        },
        validateToken: function (req, token) {
            //you could also check if request came from same IP using req.ip==token.ip for example
            if (token) {
                return moment(token.expire) > moment(new Date());
            }
            return false;
        },
        onTokenValid: function (token, next, cancel) {
            var username = token.username;
            if (true) {
                next()
            } else {
                cancel();
            }
        },
        userInRole: function (token, roles, next, cancel) {
            var username = token.username;
            if (true) {
                next();
            } else {
                cancel();
            }
        },
        onAuthorized: function (req, token, res) {

            console.log("On Authorized line 154");
            console.log(req.body, token)
        },
        onUnauthorized: function (req, token, res, errorMessage) {
            console.log(req.path, "this will be executed if request fails authentication");
            res.send({status: false, message: errorMessage});
        },
        secureRoutes: [
            {url: '/updateuser', method: 'post'},
            {url: '/product/*', method: 'get'},
            {url: '/product/*', method: 'post'} //any action under /secure route but NOT default "/secure" route
        ]
    });
};