const db = require('../../config/db')

async function find(filters, table) {
    let query = `SELECT * FROM ${table}`

    if(filters) {
        Object.keys(filters).map(key => {
            query += ` ${key}`
            
            if(key != 'limit' && key != 'offset') 
                Object.keys(filters[key]).map(field => {
                    query += ` ${field} ILIKE '%${filters[key][field]}%'`
                })
            else
                query += ` ${filters[key]}`
        })
    }

    console.log('esta é a query de agora')
    console.log(query)

    return await db.query(query)
}

module.exports = {
    init({ table }) {
        if(!table)
            throw new Error('Invalid Params')
        
        this.table = table
        return this
    },
    async all(filters) {
        const result = await find(filters, this.table)
        return result.rows
    },
    async create(fields) {
        const keys = []
        const values = []

        Object.keys(fields).map(key => {
            keys.push(key)
            values.push(`'${fields[key]}'`)
        })

        const query = `INSERT INTO ${this.table} (${keys.join(',')}) VALUES (${values.join(',')}) RETURNING id`
        const result = await db.query(query)

        return result.rows[0].id
    },
    async find(fields) {
        const result = await find(fields, this.table)
        return result.rows[0]
    }
}