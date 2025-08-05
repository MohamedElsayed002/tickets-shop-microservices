// import { currentUser } from '@tickets-validation/common'
import express from 'express'
import { currentUser } from 'tickets-validator'
// import { CurrentUser } from '../middlewares/current-user'
const router = express.Router()

router.get('/api/users/current-user', currentUser,(req, res) => {
    res.send({currentUser: req.currentUser || null})
})


export { router as currentUserRouter }