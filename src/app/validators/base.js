function isEmpty(fields) {
    const keys = Object.keys(fields)
    
    for(key of keys)
        if(!fields[key])
            return true
    
    return false
}

function post(req, res, next) {    
    if(isEmpty(req.body))
        return res.send('Por favor, preencha todos os campos!')

    return next()
}

function update(req, res, next) {
    if(isEmpty(req.body))
        return res.send('Por favor, preencha todos os campos!')

    return next()
}

module.exports = {
    isEmpty,
    post,
    update
}