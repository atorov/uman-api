import jwt from 'jsonwebtoken'

import xsServer from '../xdata/xsettings/server.js'

import HTTPError from './http-error.js'

const secretKey = process.env.SECRET_KEY

function generateAccessToken(user) {
    if (!secretKey) {
        const msg = 'Secret key not found!'
        throw new HTTPError(msg, 500)
    }

    return jwt.sign(
        {
            userId: user.id,
            email: user.email,
            role: user.role,
        },
        secretKey,
        { expiresIn: xsServer.session.expiresIn },
    )
}

export default generateAccessToken
