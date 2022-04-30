const {Pool, Client} = require('pg')
const connectionString = 'postgresql://postgres:@localhost:1111/Students'


module.exports = {
    getUser: async (login,password) => {
        const client = new Client({
            connectionString,
        })

        const getData = async () =>{
            client.connect()
            return await client.query(`SELECT * from "users" where login='${login}' and password='${password}'`).then(res => {
                client.end();
                return res.rows
            })
        }

        return await getData()
    }
}

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
