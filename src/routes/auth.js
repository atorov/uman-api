import express from 'express'

import login from '../controllers/auth/login.js'

const router = express.Router()

// public
router.post('/', login)

export default router
