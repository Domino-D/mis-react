const express = require('express')
const router = express.Router()
const userHandler = require('./controllers/user')
const sessionHandler = require('./controllers/session')
const dataHandler = require('./controllers/data')

function newAdminSignUp(req, res, next){
    if (!req.session.user||req.session.user.identity === 'admin') {
        return res.status(401).json({
            error: 'Unauthority'
        })
    }
    next()
}

function checkSession(req, res, next){
    const {user} = req.session
    if (!user) {
        return res.status(401).json({
            error: 'Unauthority'
        })
    }
    next()
}

router
    .get('/session', sessionHandler.get)
    .post('/session', sessionHandler.query)
    .get('/session/delete', sessionHandler.destroy)

router
    .get('/user', newAdminSignUp, userHandler.query)
    .post('/user', newAdminSignUp, userHandler.create)
    .get('/user/:id', newAdminSignUp, userHandler.destroy)

router
    .get('/partsdata', checkSession, dataHandler.query)
    .post('/partsdata', checkSession, dataHandler.create)
    .post('/partsdata/:id', checkSession, dataHandler.update)
    .get('/partsdata/:id', checkSession, dataHandler.destroy)

module.exports = router