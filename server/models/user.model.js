const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "El nombre es requerido"],
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: (val) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Porfavor introduce un email válido",
        },
        unique: true,
    },
    password: {
        type: String,
        minlength: [8, "La contraseña debe contener al menos 9 caracteres"],
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
},{ timestamps: true })

UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

UserSchema.pre('save', async function(next) {
    if(!this.isModified('password')){
        next()
    }


    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})


const User = mongoose.model('User', UserSchema)

module.exports = User