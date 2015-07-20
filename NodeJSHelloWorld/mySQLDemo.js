var mysql      = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'test'
});
 
connection.connect();
 
connection.query('SELECT * FROM demo', function(err, rows, fields) {
  if (err) throw err;
 
  console.log('The solution is: ', rows[1].col1);
});
 
connection.end();