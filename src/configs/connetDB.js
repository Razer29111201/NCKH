import mysql from 'mysql2/promise';
const pool = mysql.createPool({
    host: 'sql6.freemysqlhosting.net',
    user: 'sql6694948',
    password: '2I7gJNjb1S',
    port: 3306,
    database: 'sql6694948'
})
export default pool