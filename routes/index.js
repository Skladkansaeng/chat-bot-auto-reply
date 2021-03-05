const router = require('express').Router()

router.use(`/`, require('./view'))
router.use(`/api`, require('./api'))

module.exports = router