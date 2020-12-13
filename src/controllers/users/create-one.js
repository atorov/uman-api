import bcrypt from 'bcrypt'

import HTTPError from '../../lib/http-error.js'
import User from '../../models/user.js'
import xsUser from '../../xdata/xsettings/user.js'

import generateAccessToken from '../../lib/generate-access-token.js'

async function createOne(req, res, next) {
    const { name, password, role } = req.body

    if (!name) {
        const msg = 'Could not find user name!'
        return next(new HTTPError(msg, 422))
    }

    if (!password) {
        const msg = 'Could not find user password!'
        return next(new HTTPError(msg, 422))
    }

    if (password.length < xsUser.password.minLength) {
        const msg = `Password must be at least ${xsUser.password.minLength} characters long!`
        return next(new HTTPError(msg, 422))
    }

    let existingUser
    try {
        existingUser = await User.findOne({ name })
    }
    catch (reason) {
        const msg = `Could not create user! Reason: ${reason}`
        return next(new HTTPError(msg, 500))
    }

    if (existingUser) {
        const msg = 'User already exists!'
        return next(new HTTPError(msg, 409))
    }

    let hashedPassword
    try {
        hashedPassword = await bcrypt.hash(password, xsUser.password.hash.salt)
    }
    catch (reason) {
        const msg = `Could not create user! Reason: ${reason}`
        return next(new HTTPError(msg, 500))
    }

    const user = new User({
        name,
        password: hashedPassword,
        role,
    })

    try {
        await user.save()
    }
    catch (reason) {
        const msg = `Could not save user! Reason: ${reason}`
        return next(new HTTPError(msg, 500))
    }

    let accessToken
    try {
        accessToken = generateAccessToken(user)
    }
    catch (reason) {
        const msg = `Signing up failed! Reason: ${reason}`
        return next(new HTTPError(msg, 500))
    }

    return res.status(201).json({
        userId: user.id,
        name: user.name,
        role: user.role,
        accessToken,
    })
}

export default createOne
