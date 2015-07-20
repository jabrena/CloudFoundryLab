
var Promise = require('bluebird')
var mysql = require('mysql')

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'test'
});

Promise.promisify(connection.query, connection)('SELECT * FROM demo').then(function (rows) {
  console.log('got rows!')
  console.dir(rows)
  connection.end()
})