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
    }
}