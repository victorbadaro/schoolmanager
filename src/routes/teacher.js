const routes = require('express').Router()
const TeacherController = require('../app/controllers/teachers')

routes.get('/', TeacherController.index)
routes.post('/', TeacherController.post)
routes.put('/', TeacherController.update)
routes.delete('/', TeacherController.delete)
routes.get('/create', TeacherController.create)
routes.get('/:id', TeacherController.show)
routes.get('/:id/edit', TeacherController.edit)

module.exports = routes