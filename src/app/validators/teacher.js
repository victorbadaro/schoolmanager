function isEmpty(fields) {
    const keys = Object.keys(fields)
    
    for(key of keys)
        if(!fields[key])
            return true
    
    return false
}

function post(req, res, next) {
    if(isEmpty(req.body))
        return res.render('teacher/create', { error: 'Por favor, preencha todos os campos!', teacher: req.body })

    return next()
}

function update(req, res, next) {
    if(isEmpty(req.body))
        return res.render('teacher/edit', { error: 'Por favor, preencha todos os campos!', teacher: req.body })

    return next()
}

module.exports = {
    post,
    update
}