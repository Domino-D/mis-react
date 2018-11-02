const conn = require('../models/conn')
const md5 = require('blueimp-md5')
const moment = require('moment')

exports.query = async (req, res, next) => {
    const sqlStr = `SELECT * FROM users WHERE identity='admin'`
    try {
        const user = await conn.query(sqlStr)
        res.status(200).json(user)
    } catch (err) {
        next(err)
    }
}

exports.create = async (req, res, next) => {
    const body = req.body
    const sqlStr =
        `INSERT INTO users(email, password, identity, time)
         VALUES('${body.email}', '${md5(md5(body.pwd))}', 'admin', '${moment().format('YYYY-MM-DD hh:mm:ss')}')`
    try {
        const ret = await conn.query(sqlStr)
        const user = await conn.query(`SELECT * FROM users WHERE id = '${ret.insertId}'`)
        res.status(201).json(user)
    } catch (err) {
        next(err)
    }
}

exports.destroy = async (req, res, next) => {
    try {
        const {id} = req.params
        const sqlStr =`DELETE FROM users WHERE id='${id}'`
        await conn.query(sqlStr)
        res.status(201).json({})
    } catch (err) {
        next(err)
    }
}