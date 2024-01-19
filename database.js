const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: 'localhost',
  database: 'db_notas',
  user: 'root',
  password: 'angelchavez',
  authPlugins: {
    mysql_native_password: () => () => Buffer.from('root')
  }
});

module.exports = connection;