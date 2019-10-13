var mysqlManager = require('mysql')

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

