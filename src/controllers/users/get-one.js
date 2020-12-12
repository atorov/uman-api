import HTTPError from '../../lib/http-error.js'
import User from '../../models/user.js'

async function get(req, res, next) {
    const { uid } = req.params
    if (req.userData.role !== ':ADMIN:' && req.userData.userId !== uid) {
        const msg = 'Could not retrieve the user!'
        return next(new HTTPError(msg, 403))
    }

    let user
    try {
        user = await User.findById(uid, '-password')

        const { populated } = req.query
        if (populated === 'true') {
            user.populate()
        }
    }
    catch (reason) {
        const msg = `Could not find the user! Reason: ${reason}`
        return next(new HTTPError(msg, 500))
    }

    if (!user) {
        const msg = 'Could not find a user for the provided ID!'
        return next(new HTTPError(msg, 404))
    }

    return res.json(user.toObject({ getters: true }))
}

export default get
