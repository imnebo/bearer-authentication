module.exports = function (app,mongoose) {
    require('./user')(app, mongoose);
    require('./product')(app, mongoose);

    //************** Bearer *****************
    //require('../bearer')(app, bearer, user, moment);


    //************ Custom Routes ************
    //require('../routes')(app, mongoose, user, product);
};