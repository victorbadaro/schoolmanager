const routes = require('express').Router()
const TeacherController = require('../app/controllers/TeacherController')
const TeacherValidator = require('../app/validators/teacher')

routes.get('/', TeacherController.index)
routes.post('/', TeacherValidator.post, TeacherController.post)
routes.put('/', TeacherValidator.update, TeacherController.update)
routes.delete('/', TeacherController.delete)
routes.get('/create', TeacherController.create)
routes.get('/:id', TeacherController.show)
routes.get('/:id/edit', TeacherController.edit)

module.exports = routes