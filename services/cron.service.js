const cron = require('node-cron');
const { getUsers } = require('../helpers/users')


const task = cron.schedule('0 */10 * * * *', () => {
  getUsers().forEach(({ userId }) => {
    require('../helpers/jibApi').pushMessageClaim(userId)
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

