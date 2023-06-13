const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.DB_LINK,{})
    .then(db => console.log('Database is conected'))
    .catch(err => console.error(err))