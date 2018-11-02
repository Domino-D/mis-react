const conn = require('../models/conn')
const md5 = require('blueimp-md5')

exports.query = async (req, res, next) => {
    const body = req.body
    const pwd = md5(md5(body.pwd))
    const sqlStr = `SELECT * FROM users WHERE email='${body.email}' and password='${pwd}'`
    try {
        const user = await conn.query(sqlStr)
        if(!user){
            return res.status(404).json({
                error: 'Warning! Invalid Emial or Password.'
            })
        }
        req.session.user = user
        res.status(201).json(user)
    } catch (err) {
        next(err)
    }
}

exports.get = (req, res, next) => {
    try {
        const {user} = req.session
        if (!user) {
            return res.status(401).json({
                error: 'Unanthorized'
            })
        }
        res.status(200).json(user)
    } catch (err) {
        next(err)
    }
}

exports.destroy =(req, res) => {
    delete req.session.user
    res.status(200).json({})
}