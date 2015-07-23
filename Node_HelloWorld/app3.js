// Load the http module to create an http server.
var http = require('http');
var mysql      = require('mysql');

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end("Hello World\n");

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

	connection.connect();
	 
	connection.query('SELECT * FROM demo;', function(err, rows, fields) {
	  if (err) throw err;
	 
	  console.log('The solution is: ', rows[1].col1);
	});
	 
	connection.end();



});

// Listen on port 8000, IP defaults to 127.0.0.1
server.listen(process.env.VCAP_APP_PORT || 8000);


// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:8000/");