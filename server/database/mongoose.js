import mongoose from 'mongoose'
import { MONGO_URI } from "../config/keys";
mongoose.Promise = global.Promise
mongoose.connect(MONGO_URI)
module.exports = {
    mongoose
}