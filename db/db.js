import mysql from 'mysql2/promise'


const pool = mysql.createPool ({

    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'jugadores'
})
export default pool ;