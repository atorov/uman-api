import HTTPError from '../../lib/http-error.js'
import User from '../../models/user.js'

async function getAll(req, res, next) {
    let users
    try {
        users = await User.find({}, 'name role')
        // users = await User.find({}, '-password')
    }
    catch (reason) {
        const msg = `::: Could not retrieve users! Reason: ${reason}`
        return next(new HTTPError(msg, 500))
    }

    return res.json(users.map((user) => user.toObject({ getters: true })))
}

export default getAll
