const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3006,
    user: 'root',
    password: 'pass_123',
    database: 'todo_db'
})

const port = 3002


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())


// read todo
app.get('/user', (req, res) => {
    connection.query('SELECT * FROM users', (error, result) => {
        if (!error) res.json(result)
    })
})

// read todo
app.get('/user/:id', (req, res) =>  {
    res.sendStatus(501)
})

// create user
app.post('/user', (req, res) => {
    const user = {
        fullname: req.body.fullname,
        username: req.body.username,
        passwords: req.body.passwords
    }

    connection.query('INSERT INTO users SET ?', user, (error, results) => {
        if (!error) {
            res.json({ message: 'data created'})
        } else {
            res.status(500).json({error: error})
        }
    })
   
})

// update todo, dibagian updat
app.patch('/user/:id', (req, res) => {
    res.sendStatus(501)
})

// delete to
app.delete('/user/:id', (req, res) => {
    res.sendStatus(501)
})

app.listen(port, () => {
    console.log('Listening in port: ', port)
})
