const { date, grade } = require('../../lib/utils')

module.exports = {
    get(req, res) {
        return res.render('student/index')
    },
    post(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == '')
                return res.send('Por favor, preencha todos os campos!')
        }

        return
    },
    create(req, res) {
        return res.render('student/create')
    },
    show(req, res) {
        const { id } = req.params

        return
    },
    edit(req, res) {
        return res.render('student/edit')
    },
    update(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == '')
                return res.send('Por favor, preencha todos os campos!')
        }

        return
    },
    delete(req, res) {
        return res.redirect('/student')
    }
}