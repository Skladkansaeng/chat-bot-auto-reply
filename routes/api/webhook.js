const router = require('express').Router()
const { client } = require('../../services/line.services')
const users = require('../../helpers/users')
const jwt = require('jsonwebtoken');
const { salt } = require('../../config/jsonwebtoken')
const { getUserInfo } = require('../../helpers/userInfo')

router.post('/', async (req, res) => {
  try {
    let events = req.body.events[0]
    let { replyToken, message, source } = events
    let { text, type } = message
    if (type === 'text') {
      let _message = {}
      switch (text) {
        case '1':
          users.storeUser(source)
          _message = {
            type: 'template',
            altText: "This is a buttons template",
            template: {
              type: 'buttons',
              text: 'Setting Info',
              actions: [
                {
                  type: "uri",
                  label: "View details",
                  uri: `https://8e5f87ac19b4.ngrok.io/${jwt.sign(source, salt.toString())}`,
                  altUri: {
                    desktop: `https://8e5f87ac19b4.ngrok.io/${jwt.sign(source, salt.toString())}`
                  }
                }
              ]
            }
          }
          break
        case '2':
          _message = {
            type: 'text',
            text: JSON.stringify(getUserInfo(source.userId) || {})
          }
          break
      }
      client.replyMessage(replyToken, _message)
    }
    res.sendStatus(200)
  }
  catch (e) {
    res.sendStatus(200)
  }
})

router.get('/', (_, res) => {
  client.pushMessage('U2ae0d70ab772c96b95fe66a1cca62004', [{ type: 'text', text: JSON.stringify(users.getUsers()) }])
  res.sendStatus(200)
})

module.exports = router