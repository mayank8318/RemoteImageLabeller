var mysqlManager = require('mysql2')

var mysql = mysqlManager.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mayankM1!',
  database: 'ImageLabeller'
})

mysql.connect()

module.exports = {
	mysql
}

