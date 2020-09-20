const intl = require('intl')
const { age, date, graduation } = require('../../lib/utils')
const Teacher = require('../models/Teacher')

module.exports = {
    async index(req, res) {
        let { filter, page, limit } = req.query

        page = page || 1
        limit = limit || 2
        let offset = limit * (page - 1)

        let teachers = []
        let totalTeachers = 0

        if(filter)
            teachers = await Teacher.all({
                searchFilter: true,
                where: { name: filter },
                or: { subjects_taught: filter },
                limit,
                offset
            })
        else
            teachers = await Teacher.all({ limit, offset })

        if(teachers.length > 0) {
            if(filter)
                totalTeachers = await Teacher.all({
                    searchFilter: true,
                    where: { name: filter },
                    or: { subjects_taught: filter }
                })
            else
                totalTeachers = await Teacher.all()

            const pagination = {
                page,
                total: Math.ceil(totalTeachers.length / limit)
            }

            teachers = teachers.map(teacher => ({
                ...teacher,
                subjects_taught: teacher.subjects_taught.split(',').map(subject_taught => subject_taught.trim())
            }))

            return res.render('teacher/index', { teachers, pagination, filter })
        }

        return res.render('teacher/index', { filter })
    },
    create(req, res) {
        return res.render('teacher/create')
    },
    async post(req, res) {
        const { avatar_url, name, birth_date, education_level, class_type, subjects_taught, created_at } = req.body
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == '')
                return res.send('Por favor, preencha todos os campos!')
        }

        const teacherID = await Teacher.create({
            avatar_url,
            name,
            birth_date: date(birth_date).isoFullDate,
            education_level,
            class_type,
            subjects_taught
        })

        return res.redirect(`/teacher/${teacherID}`)
    },
    async show(req, res) {
        const { id } = req.params
        let teacher = await Teacher.find({ where: {id} })

        teacher = {
            ...teacher,
            age: age(teacher.birth_date),
            education_level: graduation(teacher.education_level),
            class_type: teacher.class_type === 'presential' ? 'PRESENCIAL' : 'À DISTÂNCIA',
            subjects_taught: teacher.subjects_taught.split(',').map(subject_taught => subject_taught.trim()),
            created_at: new intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' }).format(teacher.created_at)
        }

        return res.render('teacher/show', { teacher })

        /*
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
        */
    },
    async edit(req, res) {
        const { id } = req.params
        let teacher = await Teacher.find({ where: {id} })

        teacher = {
            ...teacher,
            birth_date: date(teacher.birth_date).isoFullDate
        }

        return res.render('teacher/edit', { teacher })
    },
    async update(req, res) {
        const { id, avatar_url, name, birth_date, education_level, class_type, subjects_taught } = req.body
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == '')
                return res.send('Por favor, preencha todos os campos!')
        }

        const teacherID = await Teacher.update(id, {
            avatar_url,
            name,
            birth_date,
            education_level,
            class_type,
            subjects_taught
        })

        return res.redirect(`/teacher/${teacherID}`)
    },
    async delete(req, res) {
        const { id } = req.body

        await Teacher.delete(id)
        return res.redirect('/teacher')
    }
}