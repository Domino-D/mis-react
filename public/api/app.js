const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const router = require('./router')

const app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(session({
    secret: 'studio',
    resave: false,
    saveUninitialized: false
}))

app.use(router)

app.use((err, res) => {
    res.status(500).json({
        error: err.message
    })
})

app.listen(3000, function(){
    console.log('Server ready')
})
