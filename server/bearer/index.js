module.exports = function (app, bearer, moment) {
    require('./bearer')(app, bearer, moment);
};