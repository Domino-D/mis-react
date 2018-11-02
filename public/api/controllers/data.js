const conn = require('../models/conn')

exports.query = async (req, res, next) => {
    try {
        const {user} = req.session
        const adminAuthority = user[0].identity === 'admin'? true: false
        if (adminAuthority) {
            const sqlStr = `
                SELECT * FROM partsdata WHERE status='active'`
            const list = await conn.query(sqlStr)
            res.status(200).json(list)
        }else {
            const sqlStr = `
                SELECT * FROM partsdata`
            const list = await conn.query(sqlStr)
            res.status(200).json(list)
        }
    } catch (err) {
        next(err)
    }
}

exports.create = async (req, res, next) => {
    try {
        const body = req.body
        const {user} = req.session
        const contributor = user[0].email
        const isActive = (user[0].identity === 'admin'?'active':'closed')
        body.marks = body.marks?body.marks:'null'
        const sqlStr = `
            INSERT INTO partsdata (original, material, description, vandor, contributor, marks, status) 
            VALUES (
            '${body.original}',
            '${body.material}',
            '${body.description}',
            '${body.vandor}',
            '${contributor}',
            '${body.marks}',
            '${isActive}'
            )`
        const ret = await conn.query(sqlStr)
        const [data] = await conn.query(`SELECT * FROM partsdata WHERE id='${ret.insertId}'`)
        res.status(201).json(data)
    } catch (err) {
        next(err)
    }
}

exports.update = async (req, res, next) => {
    try {
        const {id} = req.params
        const body = req.body
        const {user} = req.session
        const email = user[0].email
        const state = body.fromSub===true?'active':'closed'
        const sqlStr = `UPDATE partsdata SET 
        original='${body.original}',
        material='${body.material}',
        description='${body.description}',
        vandor='${body.vandor}',
        contributor='${email}',
        creation=CURRENT_TIMESTAMP,
        marks='${body.marks}',
        status='${state}'
        WHERE id='${id}'`
        await conn.query(sqlStr)
        const [data] =await conn.query(`SELECT * FROM partsdata WHERE id='${id}'`)
        res.status(201).json(data)
    } catch (err) {
        next(err)
    }
}

exports.destroy = async (req, res, next) => {
    try {
        const {id} = req.params
        const sqlStr = `DELETE FROM partsdata WHERE id='${id}'`
        await conn.query(sqlStr)
        res.status(201).json({})
    } catch (err) {
        next(err)
    }
}
