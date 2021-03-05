const router = require('express').Router()
const path = require('path')
const { salt } = require('../../config/jsonwebtoken')
const jwt = require('jsonwebtoken');

router.get('/:token', (req, res) => {
  let { token } = req.params
  let user = jwt.decode(token, salt)
  user ?
    res.sendFile('infoForm.html', {
      root: path.join(__dirname, '../../public')
    }) :
    res.status(404)
})

// curl -v -X POST https://api.line.me/v2/bot/richmenu 

module.exports = router