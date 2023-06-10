require('dotenv').config()

module.exports = {
    mongodb:{
        URI: process.env.DB_LINK
    }
}