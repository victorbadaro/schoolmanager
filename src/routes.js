const express = require('express')
const teachers = require('./app/controllers/teachers')
const students = require('./app/controllers/students')
const routes = express.Router()

routes.get('/', (req, res) => {
    return res.redirect('/teacher')
})

// TEACHERS ROUTES
routes.get('/teacher', teachers.get)
routes.post('/teacher', teachers.post)
routes.put('/teacher', teachers.update)
routes.delete('/teacher', teachers.delete)
routes.get('/teacher/create', teachers.create)
routes.get('/teacher/:id', teachers.show)
routes.get('/teacher/:id/edit', teachers.edit)

// STUDENTS ROUTES
routes.get('/student', students.get)
routes.post('/student', students.post)
routes.put('/student', students.update)
routes.delete('/student', students.delete)
routes.get('/student/create', students.create)
routes.get('/student/:id', students.show)
routes.get('/student/:id/edit', students.edit)

// PAGE NOT FOUND ROUTE
routes.use((req, res) => {
    res.status(404).render('not-found')
})

module.exports = routes