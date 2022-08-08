const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    age: Number,
    confirmEmail: { type: Boolean, default: false }
}, {
    timestamps: true
})
const userModel = mongoose.model('User', userSchema)
module.exports = userModel