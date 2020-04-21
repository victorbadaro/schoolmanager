const { date, grade } = require('../../lib/utils')
const Student = require('../models/Student')

module.exports = {
    index(req, res) {
        Student.all(function(students) {
            for(student of students) {
                student.grade = grade(student.school_year)
            }
            return res.render('student/index', { students })
        })
    },
    post(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == '')
                return res.send('Por favor, preencha todos os campos!')
        }

        Student.create(req.body, function(student) {
            return res.redirect(`/student/${student.id}`)
        })
    },
    create(req, res) {
        Student.teachers(function(teachers) {
            return res.render('student/create', { teachers })
        })
    },
    show(req, res) {
        const { id } = req.params

        Student.find(id, function(student) {
            student.birth_date = `${date(student.birth_date).day}/${date(student.birth_date).month}`
            student.grade = grade(student.school_year)

            return res.render('student/show', { student })
        })
    },
    edit(req, res) {
        const { id } = req.params

        Student.find(id, function(student) {
            if(!student)
                return res.send('Aluno não encontrado!')

            student.birth_date = date(student.birth_date).isoFullDate

            Student.teachers(function(teachers) {
                return res.render('student/edit', { student, teachers })
            })
        })
    },
    update(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == '')
                return res.send('Por favor, preencha todos os campos!')
        }

        Student.update(req.body, function(student) {
            return res.redirect(`/student/${student.id}`)
        })
    },
    delete(req, res) {
        const { id } = req.body

        Student.delete(id, function() {
            return res.redirect('/student')
        })
    }
}