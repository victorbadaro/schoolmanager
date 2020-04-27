const db = require('../../config/db')
const { date } = require('../../lib/utils')

module.exports = {
    all(callback) {
        const query = `SELECT * FROM teachers ORDER BY name ASC`
        db.query(query, function(err, result) {
            if(err)
                throw `Database error!\n${err}`

            return callback(result.rows)
        })
    },
    create(data, callback) {
        const query = `
            INSERT INTO teachers (
                avatar_url,
                name,
                birth_date,
                education_level,
                class_type,
                subjects_taught,
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id`
        const values = [
            data.avatar_url,
            data.name,
            date(data.birth_date).isoFullDate,
            data.education_level,
            data.class_type,
            data.subjects_taught,
            date(Date.now()).isoFullDate
        ]

        db.query(query, values, function(err, result) {
            if(err)
                throw `Database error!\n${err}`

            return callback(result.rows[0])
        })
    },
    find(id, callback) {
        const query = `SELECT * FROM teachers WHERE id = $1`
        const value = [id]

        db.query(query, value, function(err, result) {
            if(err)
                throw `Database error!\n${err}`

            return callback(result.rows[0])
        })
    },
    findBy(filter, callback) {
        const query = `
            SELECT *
            FROM teachers
            WHERE name ILIKE '%${filter}%'
            OR subjects_taught ILIKE '%${filter}%'
            ORDER BY name ASC`

        db.query(query, function(err, result) {
            if(err)
                throw `Database error!\n${err}`

            return callback(result.rows)
        })
    },
    update(data, callback) {
        const query = `
            UPDATE teachers SET
                avatar_url = $1,
                name = $2,
                birth_date = $3,
                education_level = $4,
                class_type = $5,
                subjects_taught = $6
            WHERE id = $7
            RETURNING id`
        const values = [
            data.avatar_url,
            data.name,
            data.birth_date,
            data.education_level,
            data.class_type,
            data.subjects_taught,
            data.id
        ]

        db.query(query, values, function(err, result) {
            if(err)
                throw `Database error!\n${err}`

            return callback(result.rows[0])
        })
    },
    delete(id, callback) {
        const query = `DELETE FROM teachers WHERE id = $1`
        const value = [id]

        db.query(query, value, function(err, result) {
            if(err)
                throw `Database error!\n${err}`

            return callback()
        })
    },
    paginate(params) {
        const { filter, limit, offset, callback } = params

        let query = '',
            filterQuery = '',
            totalQuery = `(SELECT COUNT(*) FROM teachers) AS total`

        if(filter) {
            filterQuery = `
                WHERE teachers.name ILIKE '%${filter}%'
                OR teachers.subjects_taught ILIKE '%${filter}%'`

            totalQuery = `(
                SELECT COUNT (*) FROM teachers
                ${filterQuery}
            ) AS total`
        }

        query = `
            SELECT teachers.*, ${totalQuery}, COUNT(students) AS total_students
            FROM teachers
            LEFT JOIN students ON (teachers.id = students.teacher_id)
            ${filterQuery}
            GROUP BY teachers.id
            ORDER BY name ASC
            LIMIT $1 OFFSET $2`
        
        db.query(query, [limit, offset], function(err, result) {
            if(err)
                throw `Database error!\n${err}`
            
            return callback(result.rows)
        })
    }
}