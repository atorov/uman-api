// TODO:
import express from 'express'

import createOne from '../controllers/users/create-one.js'
import getAll from '../controllers/users/get-all.js'
import getOne from '../controllers/users/get-one.js'
// import remove from '../controllers/users/remove.js'
import updateOne from '../controllers/users/update-one.js'
import checkAdmin from '../middleware/check-admin.js'
import checkAuth from '../middleware/check-auth.js'
import checkUser from '../middleware/check-user.js'

const router = express.Router()

// public
// ...

// authenticated
router.use(checkAuth)
// ...

// user privileges
router.use(checkUser)
router.get('/:uid', getOne)

// admin privileges
router.use(checkAdmin)
router.get('/', getAll)
router.post('/', createOne)
router.put('/:uid', updateOne)
// router.delete('/:uid', remove)

export default router
