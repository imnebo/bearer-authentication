module.exports = function (app, mongoose) {
// mongodb://bearertest:bearertest@ds017258.mlab.com:17258/bearertest
// mongodb://bearer:bearer@ds011168.mlab.com:11168/bearer
    var config = {
        production: {
            mongodbURL: "mongodb://bearer:bearer@ds011168.mlab.com:11168/bearer"

        },
        development: {
            mongodbURL: "mongodb://bearer:bearer@ds011168.mlab.com:11168/bearer"
        }
    };

    process.env.NODE_ENV = process.env.NODE_ENV || "production";
    //process.env.NODE_ENV = process.env.NODE_ENV || "development";
    console.log("Node Environment = " + process.env.NODE_ENV);

    app.config = config[process.env.NODE_ENV];

    require('./mongoose')(app, mongoose);

};