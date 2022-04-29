const { Pool, Client } = require('pg')

const connectionString = 'postgresql://postgres:@localhost:1111/Students'
exports.pool = new Pool({
    connectionString,
})

// pool.query('SELECT NOW()', (err, res) => {
//     console.log(err, res)
//     pool.end()
// })

// const client = new Client({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'Students',
//     password: '',
//     port: 1111,
// })
//
// client.connect()
//
// client.query('SELECT NOW()', (err, res) => {
//     console.log(err, res)
//     client.end()
// })
