
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const port = 3000

const users = [
    { 
        id: 1,
        username: 'yovanta',
        password: '01011001',
        firstName: 'yovanta',
        lastName: 'anjelina',
        age: 19,
        isFinished: true
    }
]


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())


// read todo
app.get('/user', (req, res) => {
    res.json(users)
})

// read todo
app.get('/user/:id', (req, res) =>  {
    let result = null;

    for (let i = 0; i < users.length; i++) {
        if (users[i].id == req.params.id) {
            result = users[i]
        }
    }

    if (!result) {
        res.sendStatus(404)
    } else {
        res.json(result)
    }
})

// create todo
app.post('/user', (req, res) => {
    users.push(req.body)

    res.json({ message: 'data created' })
})

// update todo
app.patch('/user/:id', (req, res) => {
    for (let i = 0; i < users.length; i++) {
        if (users[i].id == req.params.id) {
            users[i].isFinished = req.body.isFinished
        }
    }

    res.json({ message: 'data updated' })
})

// delete to
app.delete('/user/:id', (req, res) => {
    let index = null;

    for (let i = 0; i < users.length; i++) {
        if (users[i].id == req.params.id) {
            index = [i]
        }
    }

    users.splice(index, 1)

    res.json({ message: 'data deleted' })
})

app.listen(port, () => {
    console.log('Listening in port: ', port)
})