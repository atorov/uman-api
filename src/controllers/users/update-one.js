// import bcrypt from 'bcrypt'

// import HTTPError from '../../lib/http-error.js'
// import User from '../../models/user.js'
// import xsUser from '../../xdata/xsettings/user.js'

async function updateOne(/* req, res, next */) {
    // const { uid } = req.params
    // const {
    //     id, name, password, role,
    // } = req.body

    // if (!id) {
    //     const msg = 'Could not find the user ID!'
    //     return next(new HTTPError(msg, 422))
    // }

    // if (id !== uid) {
    //     const msg = 'ID mismatch!'
    //     return next(new HTTPError(msg, 422))
    // }

    // let user
    // try {
    //     user = await User.findById(uid)
    // }
    // catch (reason) {
    //     const msg = `Could not update the user! Reason: ${reason}`
    //     return next(new HTTPError(msg, 500))
    // }

    // if (!user) {
    //     const msg = 'Could not find a user with the provided ID!'
    //     return next(new HTTPError(msg, 404))
    // }

    // user.name = name || user.name

    // if (password) {
    //     try {
    //         const hashedPassword = await bcrypt.hash(password, xsUser.password.hash.salt)
    //         user.password = hashedPassword
    //     }
    //     catch (reason) {
    //         const msg = `Could not update the user! Reason: ${reason}`
    //         return next(new HTTPError(msg, 500))
    //     }
    // }

    // user.role = role || user.role

    // try {
    //     await user.save()
    // }
    // catch (reason) {
    //     return next(new HTTPError(`Could not update user! Reason: ${reason}`, 500))
    // }

    // return res.json({
    //     userId: user.id,
    //     name: user.name,
    //     role: user.role,
    // })
}

export default updateOne
