/*jslint node: true*/
"use strict";

var bodyParser = require('body-parser');
var mysql      = require('mysql');

//Routes
module.exports = function (express) {

    var router = express.Router();

    router.use(bodyParser.urlencoded({ extended: false }));// parse application/x-www-form-urlencoded
    router.use(bodyParser.json());// parse application/json

/**
	//TODO: Implement a filter

	var ssl = false;
    if(req.headers['x-forwarded-proto'] === "https"){
    	ssl = true;
    }
*/

/*
	var pool      =    mysql.createPool({
	    connectionLimit : 100, //important
	    host     : 'localhost',
	    user     : 'root',
	    password : '',
	    database : 'address_book',
	    debug    :  false
	});
*/

	var pool = null;

    //if(process.env.VCAP_SERVICES){
        var services = JSON.parse(process.env.VCAP_SERVICES);

        var mysqlConfig = services["user-provided"];

        pool = mysql.createConnection({
        	connectionLimit : 100, //important
          host     : mysqlConfig[0].credentials.host,
          user     : mysqlConfig[0].credentials.username,
          port     : mysqlConfig[0].credentials.port,
          password : mysqlConfig[0].credentials.password,
          database : mysqlConfig[0].credentials.dbname,
          debug    :  false
        });

	function demodb(req,res) {
	    
	    pool.getConnection(function(err,connection){
	        if (err) {
	          connection.release();
	          res.json({"code" : 100, "status" : "Error in connection database"});
	          return;
	        }   

	        console.log('connected as id ' + connection.threadId);
	        
	        connection.query("SELECT * FROM demo;",function(err,rows){
	            connection.release();
	            if(!err) {
	                res.json(rows);
	            }           
	        });

	        connection.on('error', function(err) {      
	              res.json({"code" : 100, "status" : "Error in connection database"});
	              return;     
	        });
	  	});
	}

    router.get('/', function(req, res) {
        res.render('welcome');
    });

    function demo3(){
    	console.log("Hello World");
    };

  	var connection = null;

    //Cloud foundry
    if(process.env.VCAP_SERVICES){
        var services = JSON.parse(process.env.VCAP_SERVICES);

        var mysqlConfig = services["user-provided"];

        connection = mysql.createConnection({
          host     : mysqlConfig[0].credentials.host,
          user     : mysqlConfig[0].credentials.username,
          port     : mysqlConfig[0].credentials.port,
          password : mysqlConfig[0].credentials.password,
          database : mysqlConfig[0].credentials.dbname
        });

    //Localhost
    }else{
		connection = mysql.createConnection({
		  host     : 'localhost',
		  user     : 'root',
		  port     : '3306',
		  password : '123456',
		  database : 'test'
		});
    }


    router.get('/db', function(req, res) {

	    //demodb(req, res);
	    demo3();

    	res.header('Content-type', 'text/html');

    	try{


	//connection.connect();
			connection.connect(function(err){
			if(!err) {
			    console.log("Database is connected ... \n\n");  
			} else {
			    console.log("Error connecting database ... \n\n");  
			}
			});	
	 
	connection.query('SELECT * FROM demo;', function(err, rows, fields) {
	  if (err) throw err;
	 
	  console.log('The solution is: ', rows[1].col1);
	});
	 
	connection.end();


/*
		    pool.getConnection(function(err,connection){
		        if (err) {
		          connection.release();
		          res.json({"code" : 100, "status" : "Error in connection database"});
		          return;
		        }   

		        console.log('connected as id ' + connection.threadId);

		        connection.on('error', function(err) {      
		              res.json({"code" : 100, "status" : "Error in connection database"});
		              return;     
		        });
		  	});
*/
	  	}catch(e){
	  		console.log(e);
	  	}

        res.end('<h1>Testing a db connection</h1>');
    });

    return router;
};