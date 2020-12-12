// TODO:
import express from 'express'

// import create from '../controllers/users/create.js'
import getAll from '../controllers/users/get-all.js'
import getOne from '../controllers/users/get-one.js'
// import remove from '../controllers/users/remove.js'
// import update from '../controllers/users/update.js'
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
// router.post('/', create)
// router.put('/:uid', update)
// router.delete('/:uid', remove)

export default router
