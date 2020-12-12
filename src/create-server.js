import fs from 'fs'

import bodyParser from 'body-parser'
import compression from 'compression'
import debug from 'debug'
import express from 'express'
import helmet from 'helmet'

import HTTPError from './lib/http-error.js'

import authRoutes from './routes/auth.js'
import usersRoutes from './routes/users.js'

const print = debug('server')

function createServer(port) {
    const packageRawData = fs.readFileSync('package.json')
    const packageData = JSON.parse(packageRawData)
    const {
        name: projectName,
        version: projectVersion,
    } = packageData
    print('::: Project:', projectName, projectVersion)

    const server = express()

    server.use(helmet())
    server.use(compression())
    server.use(bodyParser.json())

    server.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept, Authorization')
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
        next()
    })

    server.get('/api/health', (req, res) => {
        res.json({
            name: projectName,
            version: projectVersion,
            message: 'Server is running.',
        })
    })

    server.use('/api/auth', authRoutes)
    server.use('/api/users', usersRoutes)

    server.use(() => {
        throw new HTTPError('Could not find this route!', 404)
    })

    server.use((err, req, res, next) => {
        print('::: Error!:', err)

        if (res.headersSent) {
            return next(err)
        }

        res.status(err.code || 500)
        return res.json({ message: err.message || 'An unknown error ocurred!' })
    })

    const s = server.listen(port, () => {
        const h = s.address().address
        const p = s.address().port
        print(`::: Server listening at http://${h}:${p}.`)
    })
}

export default createServer
