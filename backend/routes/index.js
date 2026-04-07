import express from 'express';

const router = express.Router({ mergeParams: true })

router.use('/', require('./auth'))
router.use('/posts', require('./post'))
router.use('/users', require('./user'))

export default router