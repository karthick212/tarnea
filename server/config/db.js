var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'donkeycargo.cmc4nhmz7bua.us-east-1.rds.amazonaws.com',
  //host: 'donkeycargo.cn3up4gwqfwc.us-east-1.rds.amazonaws.com',
  user: 'user',
  password: 'password',
  database: 'db',
  multipleStatements: true

  /*host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'donkeycargo'*/
});

module.exports = connection;
