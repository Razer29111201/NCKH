import mysql from 'mysql2/promise';
// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     port: 3306,
//     database: 'test'
// })
const pool = mysql.createPool({
    host: 'b1rf6cipskzufiuqtjrt-mysql.services.clever-cloud.com',
    user: 'u87wmwyuhr1ym9ef',
    password: 'uj63h1PICnq3kU8VPmJW',
    port: 3306,
    database: 'b1rf6cipskzufiuqtjrt',
    connectionLimit: 4,
})
export default pool


