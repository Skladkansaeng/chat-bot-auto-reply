const router = require('express').Router()

router.use('/userinfo', require('./userInfo'))
router.use('/webhook', require('./webhook'))

module.exports = router