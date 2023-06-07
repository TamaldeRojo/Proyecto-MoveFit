const mongoose = require('mongoose')
const {mongodb} = require('./keys')

mongoose.connect(mongodb.URI,{})
    .then(db => console.log('Database is conected'))
    .catch(err => console.error(err))