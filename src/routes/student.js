const routes = require('express').Router()
const StudentController = require('../app/controllers/StudentController')

routes.get('/', StudentController.index)
routes.post('/', StudentController.post)
routes.put('/', StudentController.update)
routes.delete('/', StudentController.delete)
routes.get('/create', StudentController.create)
routes.get('/:id', StudentController.show)
routes.get('/:id/edit', StudentController.edit)

module.exports = routes