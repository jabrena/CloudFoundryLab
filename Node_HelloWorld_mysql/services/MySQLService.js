/*jslint node: true*/
"use strict";

var mysql = require('mysql');

function MySQLService() {
	this.pool = null;
}

MySQLService.prototype.init = function() {

	var self = this;

	return new Promise(function (resolve, reject) {

		try{

			var services = JSON.parse(process.env.VCAP_SERVICES);
			//console.log(services);
			var mysqlConfig = services["user-provided"];
			var host = mysqlConfig[0].credentials.host;
			var username = mysqlConfig[0].credentials.username;
			var port = mysqlConfig[0].credentials.port;
			var password = mysqlConfig[0].credentials.password;
			var database = mysqlConfig[0].credentials.dbname;

			self.pool = mysql.createPool({
			    connectionLimit : 100, //important
				  host     : host,
				  port	   : port,
				  user     : username,
				  password : password,
				  database : database,
			    debug    :  false
			});

			return resolve("OK");
		} catch(e){
			return reject(e);
		}

	});

};

MySQLService.prototype.query = function(){

	var result = "";
	var self = this;

	return new Promise(function (resolve, reject) {

		try {

			console.log(typeof self.pool);

			self.pool.getConnection(function(err,connection){
		        if (err) {
		          connection.release();
		          result = {"code" : 100, "status" : "Error in connection database"};
		          console.log(result);
		          return reject(result);
		          //return;
		        }   

		        console.log('connected as id ' + connection.threadId);

		        connection.query("SELECT * FROM demo;",function(err,rows){
		            connection.release();
		            if(!err) {
		                result = rows;
		                console.log(result);
		                return resolve(result);
		            }           
		        });

		        connection.on('error', function(err) {      
		              result = {"code" : 100, "status" : "Error in connection database"};
		              console.log(result);
		              return reject(result);  
		        });
			});
			
		} catch (e) {
			return reject(e);
		}

	});



};

MySQLService.prototype.close = function(){

	var self = this;

	return new Promise(function (resolve, reject) {

		try{

			self.pool.end(function (err) {
				// all connections in the pool have ended
				console.log(err);
				return resolve("OK");
			});

		} catch (e) {
			return reject(e);
		}

	});

};

module.exports = MySQLService;