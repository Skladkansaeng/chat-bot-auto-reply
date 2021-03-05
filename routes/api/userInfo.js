const router = require('express').Router()
const jwt = require('jsonwebtoken');
const { salt } = require('../../config/jsonwebtoken')
const { setUserInfo, getUserInfo } = require('../../helpers/userInfo')
const _ = require('lodash')

router.post('', ({ body }, res) => {
  let { token } = body
  let user = jwt.decode(token, salt)
  let statusCode = 400
  if (user) {
    setUserInfo({ ...user, ..._.omit(body, 'token') })
    statusCode = 201
  }
  res.sendStatus(statusCode)
})

router.get('', ({ query }, res) => {
  let { token } = query
  let { userId } = jwt.decode(token, salt) || {}
  res.send(getUserInfo(userId))
})
module.exports = router