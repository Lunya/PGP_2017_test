let mysql = require('mysql2');

function getConnection() {
	let bd;
	if (process.env.NODE_ENV == 'TEST')
		bd = mysql.createConnection({
			host: process.env.MYSQL_HOST,
			port: process.env.DB_SERVER_PORT,
			user: process.env.MYSQL_USER,
			password: process.env.MYSQL_PASSWORD,
			database: process.env.MYSQL_DATABASE
		});
	else
		bd = mysql.createConnection({
			host: process.env.DB_SERVER_HOST,
			port: process.env.DB_SERVER_PORT,
			user: process.env.DB_SERVER_USER,
			password: process.env.DB_SERVER_PASSWORD,
			database: process.env.DB_NAME,
			charset: 'utf8'
		});
	return bd;
}

module.exports = getConnection;
