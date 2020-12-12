import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

import xsUser from '../xdata/xsettings/user.js'

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    password: { type: String, required: true, minLength: xsUser.password.minLength },
    role: { type: String }, // void | ':USER:' | ':ADMIN:'
})

userSchema.plugin(uniqueValidator)

const userModel = mongoose.model('User', userSchema)

export default userModel
