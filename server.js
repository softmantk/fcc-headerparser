/**
 * Created by SOFTMAN on 22-04-2017.
 */

//var ip = require('ip');
var express = require('express');

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
    }
    res.send(details);

}).listen(process.env.PORT || 3000);
