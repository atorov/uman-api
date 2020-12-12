import createServer from './create-server.js'
import dbConnect from './db-connect.js'

(async () => {
    await dbConnect(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD)
    createServer(process.env.PORT)
})()
