//**************************************************************
//***************** Bearer Authentication **********************
//**************************************************************

var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var mongoose     = require('mongoose');
var express      = require('express');
var logger       = require('morgan');
var moment       = require('moment');
var bearer       = require('bearer');
var path         = require('path');


var port = process.env.PORT || '3000';
var app = express();



app.use(logger('dev'));
app.use(express.static(path.resolve(__dirname, '../public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());


//require('./models')(app, bearer, moment, mongoose);

//************ Mongodb *********
require('./config')(app,mongoose);
require('./models')(app,mongoose);
require('./bearer')(app, bearer, moment);
require('./routes')(app, mongoose);


app.listen(port, function () {
    console.log("server is listening on port : ", port);
});