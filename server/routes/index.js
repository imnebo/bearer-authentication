module.exports = function (app) {
    require('./users')(app);
    require('./products')(app)
};