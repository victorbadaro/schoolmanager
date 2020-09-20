const Teacher = require('../models/Teacher')

function isEmpty(fields) {
    const keys = Object.keys(fields)
    
    for(key of keys)
        if(!fields[key])
            return true
    
    return false
}

async function post(req, res, next) {
    if(isEmpty(req.body)) {
        const teachers = await Teacher.all()
        return res.render('student/create', { error: 'Por favor, preencha todos os campos!', student: req.body, teachers })
    }

    return next()
}

async function update(req, res, next) {
    if(isEmpty(req.body)) {
        const teachers = await Teacher.all()
        return res.render('student/edit', { error: 'Por favor, preencha todos os campos!', student: req.body, teachers })
    }

    return next()
}

module.exports = {
    post,
    update
}