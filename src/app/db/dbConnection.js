const mysql = require('mysql2');

export const connection = mysql.createConnection({
  host: '149.50.139.22',
  user: 'cloudhubcl_administrador',
  password: 'cloudhubcl_ep_wxu2e',
  database: 'cloudhubcl_ep_wxu2e',
});
