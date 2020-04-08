const fs = require('fs')
const intl = require('intl')
const { age, date, graduation } = require('../utils')
const data = require('../data.json')

exports.get = function(req, res) {
    const teachers = []

    for (teacher of data.teachers) {
        const settedTeacher = {
            ...teacher,
            services: teacher.services.split(',')
        }
        
        teachers.push(settedTeacher)
    }

    return res.render('teacher/index', { teachers })
}

exports.post = function(req, res) {
    const keys = Object.keys(req.body)

    for (key of keys) {
        if (req.body[key] == '')
            return res.send('Por favor, preencha todos os campos!')
    }

    let id = 1
    const lastTeacher = data.teachers[data.teachers.length - 1]
    
    if (lastTeacher)
        id = lastTeacher.id + 1
    
    const birth = Date.parse(req.body.birth)
    const created_at = Date.now()

    data.teachers.push({
        id,
        ...req.body,
        birth,
        created_at
    })

    fs.writeFile('data.json', JSON.stringify(data, null, 4), (err) => {
        if (err)
            return res.send('Erro na gravação do arquivo!')

        return res.redirect('/teacher')
    })
}

exports.create = function(req, res) {
    return res.render('teacher/create')
}

exports.show = function(req, res) {
    const { id } = req.params
    const foundTeacher = data.teachers.find(function(teacher) {
        return teacher.id == id
    })

    if (!foundTeacher)
        return res.send('Não há nenhum professor com esse ID!')

    const teacher = {
        ...foundTeacher,
        age: age(foundTeacher.birth),
        degree: graduation(foundTeacher.degree),
        class_type: foundTeacher.class_type == 'presential' ? 'Presencial' : 'EAD',
        services: foundTeacher.services.split(','),
        created_at: new intl.DateTimeFormat('pt-BR').format(foundTeacher.created_at)
    }

    return res.render('teacher/show', { teacher })
}

exports.edit = function(req, res) {
    const { id } = req.params
    const foundTeacher = data.teachers.find(function(teacher) {
        return teacher.id == id
    })

    if (!foundTeacher)
        return res.send('Não há professores com esse ID!')

    const teacher = {
        ...foundTeacher,
        birth: date(foundTeacher.birth).isoFullDate,
        services: foundTeacher.services.split(',')
    }
    return res.render('teacher/edit', { teacher })
}

exports.update = function(req, res) {
    const { id } = req.body
    let index = 0

    const foundTeacher = data.teachers.find(function(teacher, foundIndex) {
        if (teacher.id == id) {
            index = foundIndex
            return true
        }
    })

    if (!foundTeacher)
        return res.send('Não há nenhum professor com esse ID!')

    const teacher = {
        ...foundTeacher,
        ...req.body,
        id: Number(req.body.id),
        birth: Date.parse(req.body.birth)
    }

    data.teachers[index] = teacher

    fs.writeFile('data.json', JSON.stringify(data, null, 4), function(err) {
        if (err)
            res.send('Erro na gravação do arquivo!')

        return res.redirect(`/teacher/${id}`)
    })
}

exports.delete = function(req, res) {
    const { id } = req.body
    const filteredTeachers = data.teachers.filter(function(teacher) {
        if (teacher.id != id)
            return true
    })

    data.teachers = filteredTeachers

    fs.writeFile('data.json', JSON.stringify(data, null, 4), function(err) {
        if (err)
            res.send('Erro na gravação do arquivo!')
        
        return res.redirect('/teacher')
    })
}