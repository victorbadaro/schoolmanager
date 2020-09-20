const routes = require('express').Router()
const StudentController = require('../app/controllers/StudentController')
const StudentValidator = require('../app/validators/student')

routes.get('/', StudentController.index)
routes.post('/', StudentValidator.post, StudentController.post)
routes.put('/', StudentValidator.update, StudentController.update)
routes.delete('/', StudentController.delete)
routes.get('/create', StudentController.create)
routes.get('/:id', StudentController.show)
routes.get('/:id/edit', StudentController.edit)

module.exports = routes