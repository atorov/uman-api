import HTTPError from '../../lib/http-error.js'
import User from '../../models/user.js'

async function remove(req, res, next) {
    const { uid } = req.params

    let user
    try {
        user = await User.findById(uid)
    }
    catch (reason) {
        const msg = `Could not delete user! Reason: ${reason}`
        return next(new HTTPError(msg, 500))
    }

    if (!user) {
        const msg = 'Could not delete the user!'
        return next(new HTTPError(msg, 404))
    }

    try {
        await user.deleteOne()
    }
    catch (reason) {
        const msg = `Could not delete user! Reason: ${reason}`
        return next(new HTTPError(msg, 500))
    }

    // TODO: ?

    return res.status(204).send()
}

export default remove
