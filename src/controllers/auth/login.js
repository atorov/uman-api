// import bcrypt from 'bcrypt'

import HTTPError from '../../lib/http-error.js'
import User from '../../models/user.js'
// import xsUser from '../../xdata/xsettings/user.js'

import generateAccessToken from '../../lib/generate-access-token.js'

async function login(req, res, next) {
    const { name /* , password */ } = req.body

    let user
    try {
        user = await User.findOne({ name })
    }
    catch (reason) {
        const msg = `Could not authenticate this user! Reason: ${reason}`
        return next(new HTTPError(msg, 500))
    }

    console.log(user)
    if (!user) {
        const msg = 'Could not authenticate this user!'
        return next(new HTTPError(msg, 403))
    }

    // TODO:
    // let isPasswordValid = !!password && password.length >= xsUser.password.minLength
    // if (isPasswordValid) {
    //     try {
    //         isPasswordValid = await bcrypt.compare(password, user.password)
    //     }
    //     catch (reason) {
    //         const msg = `Could not authenticate this user! Reason: ${reason}`
    //         return next(new HTTPError(msg, 500))
    //     }
    // }

    // if (!isPasswordValid) {
    //     const msg = 'Could not authenticate this user!'
    //     return next(new HTTPError(msg, 401))
    // }

    let accessToken
    try {
        accessToken = generateAccessToken(user)
    }
    catch (reason) {
        const msg = `Could not authenticate this user! Reason: ${reason}`
        return next(new HTTPError(msg, 500))
    }

    return res.json({
        userId: user.id,
        name: user.name,
        role: user.role,
        accessToken,
    })
}

export default login
