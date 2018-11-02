const mysql = require('mysql')

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'jamie987',
    database: 'mis'
})

exports.query = (sqlStr) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                return reject(err)
            }
            connection.query(sqlStr, (err, ...args) => {
                connection.release()
                if (err) {
                    return reject(err)
                }
                resolve(...args)
            })
        })
    })
}