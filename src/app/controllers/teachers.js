const intl = require('intl')
const { age, date, graduation } = require('../../lib/utils')

module.exports = {
    get(req, res) {
        return res.render('teacher/index')
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
        return res.render('teacher/create')
    },
    show(req, res) {
        return res.render('teacher/show')
    },
    edit(req, res) {
        return res.render('teacher/edit')
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
        return res.redirect('/teacher')
    }
}