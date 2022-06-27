require('dotenv').config()

const config = {
    db: {
        host: "postgres",
        user: "root",
        password: "root",
        database: "my_store",
    }
}

module.exports = config;