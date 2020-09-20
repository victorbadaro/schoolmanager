const routes = require('express').Router()
const teacher = require('./teacher')
const student = require('./student')

// MAIN ROUTE
routes.get('/', (req, res) => res.redirect('/teacher'))

routes.use('/teacher', teacher)
routes.use('/student', student)

// PAGE NOT FOUND ROUTE
routes.use((req, res) => res.status(404).render('not-found'))

module.exports = routes