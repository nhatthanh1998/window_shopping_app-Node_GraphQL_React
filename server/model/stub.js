import mongoose, { mongo } from 'mongoose'

const StubSchema = new mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    type: {
        type: String
    },
    code: {
        type: String
    },
    price: {
        type: String
    },
    shop: {
        type: String
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
})

const Stub = mongoose.model('stub', StubSchema)
StubSchema.pre('remove',function(next){
    const User = mongoose.model('user')
    User.findById(this.author).then(user=>{
        var newStubList = user.stubs.filter(_id=>{
            _id !== this._id
        })
        user.stubs = newStubList
        user.save().then(user=>{
            return next()
        })
    })
})
module.exports = {
    Stub
}
module.exports = {
    Stub
}