const path = require('path')
const express = require('express')
const {nowDBQuery, pool} = require("./src/database");
const app = express()

const port = 3000

app.use('/static', express.static('public'))

app.get('/favicon.ico',(req,res)=>{
    res.sendFile(path.join(__dirname,'/public/images/favicon.ico'));
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'/public/views/main/index.html'))
})

// пример запроса
// pool.query('SELECT NOW()', (err, res) => {
//     console.log(err, res)
//     pool.end()
// })

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
