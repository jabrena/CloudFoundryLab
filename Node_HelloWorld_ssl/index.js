/*jslint node: true*/
"use strict";

var fs = require('fs');
var express = require('express');
var app = express();
var secureServer = require('https').createServer({
    key: fs.readFileSync('privkey.pem'),
    cert: fs.readFileSync('cert.pem')
}, app);

app.get('/', function (req, res) {
    console.log(JSON.stringify(req.headers));

    res.header('Content-type', 'text/html');
    return res.end('<h1>Hello, Secure World!</h1>');
});

var portSecure = process.env.VCAP_APP_PORT || 4443;
secureServer.listen(portSecure, function () {
    console.log('Listening on *:' + portSecure);
});
