const fs = require('fs');

/*
module.exports = {
 client: 'mysql2',
 connection: {
 host: '127.0.0.1',
 database: 'localis_data',
 user: 'root',
 password: 'password'
 }
}
*/
module.exports = {
 client: 'mysql2',
 connection: {
 host: 'mysql-26d78fec-locali.l.aivencloud.com',
 port: 25406,
 database: 'localis_data',
 user: 'avnadmin',
 password: 'AVNS_PncBGCNh1FNyrTEOKhG',
ssl: {
      // Enforce SSL and verify the server's certificate against the provided CA
      rejectUnauthorized: true,
      ca: fs.readFileSync('./ca.pem').toString(),
    },
  },
};
