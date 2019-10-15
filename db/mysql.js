var mysqlManager = require('mysql')

var mysql = mysqlManager.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'toor',
  database: 'ImageLabeller'
})

mysql.connect()

module.exports = {
	mysql
}

