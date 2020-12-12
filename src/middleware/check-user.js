import HTTPError from '../lib/http-error.js'

function checkAuth(req, res, next) {
    if (req.method === 'OPTIONS') {
        return next()
    }

    const { role } = req.userData
    if ([':USER:', ':ADMIN:'].includes(role)) {
        return next()
    }

    const msg = 'Authentication failed! The user does not have required privileges!'
    throw new HTTPError(msg, 403)
}

export default checkAuth
