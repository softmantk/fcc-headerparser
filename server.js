/**
 * Created by SOFTMAN on 22-04-2017.
 */

//var ip = require('ip');
var express = require('express');
var path = require('path');
var multer = require('multer');
var logger = require("morgan");
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended : false
}));

var upload = multer({dest : 'uploads/'});

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, "public")));
var app = express();

app.get('/', function (req, res) {

    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;


    var lang = req.acceptsLanguages()[0];
    var usr = req.headers['user-agent'];
    var os = usr.substring(usr.indexOf('('), usr.indexOf(')')).substring(1);
    var details = {
        ip : ip,
        os : os,
        language : lang
    };
    res.send(details);


    // for   https://www.freecodecamp.com/challenges/file-metadata-microservice

    app.post("/metaHandler",upload.single('file'), function (req, res) {

        var size = {
            size : req.file.size
        };
        res.send(size);
    });

    //ends

}).listen(process.env.PORT || 3000);
