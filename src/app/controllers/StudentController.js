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
                searchFilter: true,
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
                    searchFilter: true,
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

        const studentID = await Student.create({
            avatar_url,
            name,
            birth_date: date(birth_date).isoFullDate,
            email,
            school_year,
            hours_by_week,
            teacher_id
        })

        return res.render('student/success', { message: 'Aluno cadastrado com sucesso!', studentID })
    },
    async create(req, res) {
        const teachers = await Teacher.all()

        return res.render('student/create', { teachers })
    },
    async show(req, res) {
        const { id } = req.params
        let student = await Student.find({ where: {id} })
        const teacher = await Teacher.find({ where: { id: student.teacher_id } })

        student = {
            ...student,
            birth_date: `${date(student.birth_date).day}/${date(student.birth_date).month}`,
            grade: grade(student.school_year),
            teacher_name: teacher.name
        }

        return res.render('student/show', { student })
    },
    async edit(req, res) {
        const { id } = req.params
        let student = await Student.find({ where: {id} })
        const teacher = await Teacher.find({ where: { id: student.teacher_id } })
        const teachers = await Teacher.all()

        student = {
            ...student,
            birth_date: date(student.birth_date).isoFullDate,
            teacher_name: teacher.name
        }

        return res.render('student/edit', { student, teachers })
    },
    async update(req, res) {
        const { id, avatar_url, name, birth_date, email, school_year, hours_by_week, teacher_id } = req.body

        const studentID = await Student.update(id, {
            avatar_url,
            name,
            birth_date,
            email,
            school_year,
            hours_by_week,
            teacher_id
        })

        return res.render('student/success', { message: 'Aluno atualizado com sucesso!', studentID })
    },
    async delete(req, res) {
        const { id } = req.body
        await Student.delete(id)

        return res.render('student/deleted', { message: 'Aluno deletado com sucesso!' })
    }
}