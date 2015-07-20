// Load the http module to create an http server.
var http = require('http');
var mysql      = require('mysql');
var Promise = require('bluebird')
var resultExample = 0;
Promise.promisifyAll(mysql);

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  //response.end("Hello World\n");

    var connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : '123456',
      database : 'test'
    });
     


    Promise.promisify(connection.query, connection)('SELECT * FROM demo').then(function (rows) {
      //console.log('got rows!')
      //console.dir(rows)
      //console.dir(rows[0][0].col1)
      resultExample = rows[0][1].col1;
    console.log('The solution is: ', resultExample);
      
      connection.end()
    })


    response.end('The solution is: ', resultExample);

});

// Listen on port 8000, IP defaults to 127.0.0.1
server.listen(process.env.VCAP_APP_PORT || 8000);


// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:8000/");