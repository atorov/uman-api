import jwt from 'jsonwebtoken'

import HTTPError from '../lib/http-error.js'

const secretKey = process.env.SECRET_KEY

function checkAuth(req, res, next) {
    if (req.method === 'OPTIONS') {
        return next()
    }

    if (!secretKey) {
        const msg = 'Secret key not found!'
        throw new HTTPError(msg, 500)
    }

    try {
        const accessToken = req.headers.authorization.split(' ')[1]

        if (!accessToken) {
            const msg = 'Authentication failed!'
            throw new HTTPError(msg, 401)
        }

        const decodedAccessToken = jwt.verify(accessToken, secretKey)
        req.userData = {
            userId: decodedAccessToken.userId,
            name: decodedAccessToken.name,
            role: decodedAccessToken.role,
        }
        return next()
    }
    catch (reason) {
        const msg = `Authentication failed! Reason: ${reason}`
        return next(new HTTPError(msg, 401))
    }
}

export default checkAuth
