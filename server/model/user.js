import mongoose from 'mongoose'
const UserSchema = new mongoose.Schema({
    googleId: {
        type: String
    },
    facebookId: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    hourlyIncome: {
        type: Number
    },
    address: {
        type: String
    },
    displayName:{
        type:String
    },
    stubs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'stub'
        }
    ]
})

const User = mongoose.model('user', UserSchema)

module.exports = {
    User
}