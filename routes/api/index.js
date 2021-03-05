const router = require('express').Router()

router.use('/userinfo', require('./UserInfo'))
router.use('/webhook', require('./webhook'))

module.exports = router