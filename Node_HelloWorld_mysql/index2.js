/*jslint node: true*/
"use strict";

var express    = require("express");
var mysql      = require('mysql');
var app = express();

var MySQLService = require("./services/MySQLService");
MySQLService = new MySQLService();

app.get("/init/",function(req,res){

	var queryResult = "";

	MySQLService.init().then(function (result) {
		console.log("result", result);
		queryResult = result;
		res.json(queryResult);
	}).catch(function(err) {
        res.json(err);
	});

});

app.get("/query/",function(req,res){

	var queryResult = "";

	MySQLService.query().then(function (result) {
		console.log("result", result);
		queryResult = result;
		res.json(queryResult);
	}).catch(function(err) {
        res.json(err);
	});

});

app.get("/close/",function(req,res){

	var queryResult = "";

	MySQLService.close().then(function (result) {
		console.log("result", result);
		queryResult = result;
		res.json(queryResult);
	}).catch(function(err) {
        res.json(err);
	});

});

var localPort = process.env.VCAP_APP_PORT || 3000;
app.listen(localPort);