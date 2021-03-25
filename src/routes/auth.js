import express from 'express'

import checkAuth from '../middleware/check-auth.js'
import login from '../controllers/auth/login.js'

const router = express.Router()

// public
router.post('/', login)

// authenticated
router.get('/', [checkAuth, (_, res) => res.end()])

export default router
