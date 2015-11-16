/*jslint node: true*/
"use strict";

var express = require('express');
var app = express();
var http = require('http').Server(app);
app.use(express.static(__dirname + '/public'));
app.get('/ssl/', function (req, res) {
    console.log(req.headers);

    res.header('Content-type', 'text/html');

    var ssl = false;
    if(req.headers['x-forwarded-proto'] === "https"){
    	ssl = true;
    }

    return res.end('<h1>Testing http headers</h1>' + "<h2>https: " + ssl + "</h2>" + '<pre>' + JSON.stringify(req.headers) + '</pre>');
});


//Server
var localPort = process.env.VCAP_APP_PORT || 3000;
http.listen(localPort, function () {
    console.log('Listening on *:' + localPort);
});