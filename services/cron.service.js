const cron = require('node-cron');
const { getUsers } = require('../helpers/users')
const { client } = require('./line.services')
const task = cron.schedule('* * * * *', () => {
  getUsers().forEach(({ userId }) => {
    client.pushMessage(userId, { type: 'text', text: 'From Cronjob' })
  })
})
module.exports = {
  run: () => {
    task.start()
  },
  stop: () => {
    task.stop()
  }
}

