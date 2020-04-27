const intl = require('intl')
const { age, date, graduation } = require('../../lib/utils')
const Teacher = require('../models/Teacher')

module.exports = {
    index(req, res) {
        let { filter, page, limit } = req.query

        page = page || 1
        limit = limit || 2
        let offset = limit * (page - 1)

        const params = {
            filter,
            page,
            limit,
            offset,
            callback(teachers) {
                const pagination = {
                    page,
                    total: Math.ceil(teachers[0].total / limit)
                }

                console.log(teachers)

                for(teacher of teachers) {
                    const subjects_taught = teacher.subjects_taught.split(',').map(function(subject_taught) {
                        return subject_taught.trim()
                    })

                    teacher.subjects_taught = subjects_taught
                }

                return res.render('teacher/index', { teachers, pagination, filter })
            }
        }

        Teacher.paginate(params)
    },
    create(req, res) {
        return res.render('teacher/create')
    },
    post(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == '')
                return res.send('Por favor, preencha todos os campos!')
        }

        Teacher.create(req.body, function(teacher) {
            return res.redirect(`teacher/${teacher.id}`)
        })
    },
    show(req, res) {
        const { id } = req.params

        Teacher.find(id, function(teacher) {
            teacher.age = age(teacher.birth_date)
            teacher.education_level = graduation(teacher.education_level)
            teacher.class_type = teacher.class_type == 'presential' ? 'PRESENCIAL' : 'À DISTÂNCIA'
            teacher.subjects_taught = teacher.subjects_taught.split(',').map(function(subject) {
                return subject.trim()
            })
            teacher.created_at = new intl.DateTimeFormat('pt-BR', {timeZone: 'UTC'}).format(teacher.created_at)

            return res.render('teacher/show', { teacher })
        })
    },
    edit(req, res) {
        const { id } = req.params

        Teacher.find(id, function(teacher) {
            teacher.birth_date = date(teacher.birth_date).isoFullDate

            return res.render('teacher/edit', { teacher })
        })
    },
    update(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == '')
                return res.send('Por favor, preencha todos os campos!')
        }

        Teacher.update(req.body, function(teacher) {
            return res.redirect(`/teacher/${teacher.id}`)
        })
    },
    delete(req, res) {
        const { id } = req.body

        Teacher.delete(id, function() {
            return res.redirect('/teacher')
        })
    }
}