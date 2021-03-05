const router = require('express').Router()

router.use('/userinfo', require('./userinfo'))
router.use('/webhook', require('./webhook'))

module.exports = router