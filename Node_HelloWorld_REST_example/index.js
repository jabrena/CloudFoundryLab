/*jslint node: true*/
"use strict";

var express = require('express');
var app = express();
var http = require('http').Server(app);
var HttpUtils = require('./utils/HttpUtils');
var entities = require("entities");

//REST API
app.get('/', function (req, res) {

    console.log("GET /")

    res.header('Content-type', 'text/html');
    return res.end('<h1>Testing REST connection</h1>');

});

app.get('/demo/', function (req, res) {

    console.log("GET /")

    var REST = new HttpUtils();
    var url = "http://juanantonio.info/"
    var options = {
        method: 'GET',
        url: url
    };

    return REST.request(options, "200", false).then(function (result) {
        res.header('Content-type', 'text/html');
        return res.end('<pre><code>' + entities.encodeHTML(result) + '</code></pre>');
    });

});


//Server
//console.log("VCAP_APP_PORT" + process.env.VCAP_APP_PORT)
//console.log("PORT" + process.env.PORT) // Diego
var localPort = process.env.VCAP_APP_PORT || 7000;
http.listen(localPort, function () {
    console.log('Listening on *:' + localPort);
});