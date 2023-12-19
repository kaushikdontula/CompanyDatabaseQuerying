var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu', 
  user            : 'cs340_dontulak',
  password        : '1379',
  database        : 'cs340_dontulak'
});

module.exports.pool = pool;
