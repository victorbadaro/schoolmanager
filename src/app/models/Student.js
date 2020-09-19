const db = require('../../config/db')
const { date } = require('../../lib/utils')
const Base = require('./Base')

Base.init({ table: 'students' })

module.exports = {
    ...Base,
    // find(id, callback) {
    //     const query = `
    //         SELECT students.*, teachers.name AS teacher_name
    //         FROM students
    //         LEFT JOIN teachers ON (students.teacher_id = teachers.id)
    //         WHERE students.id = $1`
    //     const value = [id]

    //     db.query(query, value, function(err, result) {
    //         if(err)
    //             throw `Database error!\n${err}`
            
    //         return callback(result.rows[0])
    //     })
    // },
    update(data, callback) {
        const query = `
            UPDATE students SET
                avatar_url = $1,
                name = $2,
                birth_date = $3,
                email = $4,
                school_year = $5,
                hours_by_week = $6,
                teacher_id = $7
            WHERE id = $8
            RETURNING id`
        const values = [
            data.avatar_url,
            data.name,
            data.birth_date,
            data.email,
            data.school_year,
            data.hours_by_week,
            data.teacher_id,
            data.id
        ]

        db.query(query, values, function(err, result) {
            if(err)
                throw `Database error!\n${err}`

            return callback(result.rows[0])
        })
    },
    delete(id, callback) {
        const query = `DELETE FROM students WHERE id = $1`
        const value = [id]

        db.query(query, value, function(err, result) {
            if(err)
                throw `Database error!\n${err}`

            return callback()
        })
    }
}