const mongoose = require('mongoose')
const bc = require('bcrypt-nodejs')
const { Schema } = mongoose

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

 userSchema.methods.encryptPassword = (password) => {
    return bc.hashSync(password, bc.genSaltSync(5))
}

userSchema.methods.checkPassword = (password) => {
    return bc.compareSync(password, this.password)  //descifra y compara con la password guardada
} 

module.exports = mongoose.model('Users',userSchema,'Users') //Users es la coleccion de mongo