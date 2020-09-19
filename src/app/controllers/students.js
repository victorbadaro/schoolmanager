const { date, grade } = require('../../lib/utils')
const Student = require('../models/Student')
const Teacher = require('../models/Teacher')

module.exports = {
    async index(req, res) {
        let { filter, page, limit } = req.query

        page = page || 1
        limit = limit || 2
        let offset = limit * (page - 1)

        let students = []
        let totalStudents = 0

        if(filter)
            students = await Student.all({
                where: { name: filter },
                or: { email: filter },
                limit,
                offset
            })
        else
            students = await Student.all({ limit, offset })

        if(students.length > 0) {
            if(filter)
                totalStudents = await Student.all({
                    where: { name: filter },
                    or: { email: filter }
                })
            else
                totalStudents = await Student.all()

            const pagination = {
                page,
                total: Math.ceil(totalStudents.length / limit)
            }
    
            students = students.map(student => ({
                ...student,
                grade: grade(student.school_year)
            }))

            return res.render('student/index', { students, pagination, filter })
        }

        return res.render('student/index', { filter })
    },
    async post(req, res) {
        const { avatar_url, name, birth_date, email, school_year, hours_by_week, teacher_id } = req.body
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == '')
                return res.send('Por favor, preencha todos os campos!')
        }

        const studentID = await Student.create({
            avatar_url,
            name,
            birth_date: date(birth_date).isoFullDate,
            email,
            school_year,
            hours_by_week,
            teacher_id
        })

        return res.redirect(`/student/${studentID}`)
    },
    async create(req, res) {
        const teachers = await Teacher.all()

        return res.render('student/create', { teachers })
    },
    async show(req, res) {
        const { id } = req.params
        const student = await Student.find({ where: {id} })

        return res.render('student/show', { student })
        Student.find(id, function(student) {
            student.birth_date = `${date(student.birth_date).day}/${date(student.birth_date).month}`
            student.grade = grade(student.school_year)

            return res.render('student/show', { student })
        })
    },
    async edit(req, res) {
        const { id } = req.params
        const student = await Student.find({ where: {id} })
        const teachers = await Teacher.all()
        let teacher = {}

        teachers.forEach(teacher => {

        })

        student.birth_date = date(student.birth_date).isoFullDate

        return res.render('student/edit', { student, teachers })

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