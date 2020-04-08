const fs = require('fs')
const { date, grade } = require('../utils')
const data = require('../data.json')

exports.get = function(req, res) {
    const students = []

    for (student of data.students) {
        const currentStudent = {
            ...student,
            grade: grade(student.schoolYear)
        }

        students.push(currentStudent)
    }

    return res.render('student/index', { students })
}

exports.post = function(req, res) {
    const keys = Object.keys(req.body)

    for (key of keys) {
        if (req.body[key] == '')
            return res.send('Por favor, preencha todos os campos!')
    }

    const birth = Date.parse(req.body.birth)
    let id = 1
    const lastStudent = data.students[data.students.length - 1]

    if (lastStudent)
        id = lastStudent.id + 1

    data.students.push({
        id,
        ...req.body,
        birth,
        hoursByWeek: Number(req.body.hoursByWeek)
    })

    fs.writeFile('data.json', JSON.stringify(data, null, 4), (err) => {
        if (err)
            return res.send('Erro na gravação do arquivo!')

        return res.redirect('/student')
    })
}

exports.create = function(req, res) {
    return res.render('student/create')
}

exports.show = function(req, res) {
    const { id } = req.params
    const foundstudent = data.students.find(function(student) {
        return student.id == id
    })

    if (!foundstudent)
        return res.send('Não há nenhum aluno com esse ID!')

    const student = {
        ...foundstudent,
        birth: `${date(foundstudent.birth).day}/${date(foundstudent.birth).month}`,
        grade: grade(foundstudent.schoolYear)
    }

    return res.render('student/show', { student })
}

exports.edit = function(req, res) {
    const { id } = req.params
    const foundstudent = data.students.find(function(student) {
        return student.id == id
    })

    if (!foundstudent)
        return res.send('Não há alunos com esse ID!')

    const student = {
        ...foundstudent,
        birth: date(foundstudent.birth).isoFullDate
    }

    return res.render('student/edit', { student })
}

exports.update = function(req, res) {
    const { id } = req.body
    let index = 0

    const foundstudent = data.students.find(function(student, foundIndex) {
        if (student.id == id) {
            index = foundIndex
            return true
        }
    })

    if (!foundstudent)
        return res.send('Não há nenhum aluno com esse ID!')

    const student = {
        ...foundstudent,
        ...req.body,
        id: Number(req.body.id),
        birth: Date.parse(req.body.birth),
        hoursByWeek: Number(req.body.hoursByWeek)
    }

    data.students[index] = student

    fs.writeFile('data.json', JSON.stringify(data, null, 4), function(err) {
        if (err)
            res.send('Erro na gravação do arquivo!')

        return res.redirect(`/student/${id}`)
    })
}

exports.delete = function(req, res) {
    const { id } = req.body
    const filteredstudents = data.students.filter(function(student) {
        if (student.id != id)
            return true
    })

    data.students = filteredstudents

    fs.writeFile('data.json', JSON.stringify(data, null, 4), function(err) {
        if (err)
            res.send('Erro na gravação do arquivo!')
        
        return res.redirect('/student')
    })
}