const cron = require('node-cron');
const { getUsers } = require('../helpers/users')
const { getUserInfo } = require('../helpers/userInfo')
const { jibCaller } = require('../helpers/jibApi')
const { client } = require('./line.services');
const path = require('path')
const config = require('../config/app')

const task = cron.schedule('* * * * *', () => {
  getUsers().forEach(({ userId }) => {
    let { tel } = getUserInfo(userId) || {}
    jibCaller(tel, (_, __, body) => {
      let claims = JSON.parse(body)
      if (claims.length !== undefined)
        claims.forEach(async claim => {
          let { claimno, claimname } = claim
          client.pushMessage(userId, { type: 'text', text: `หมายเลขเคลม : ${claimno}` })
          client.pushMessage(userId, { type: 'text', text: `สินค้าที่เคลม : ${claimname}` })
          const puppeteer = require('puppeteer');
          (async () => {
            const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
            const page = await browser.newPage();
            await page.goto(`https://www.jib.co.th/web/claim/claim_report/${claimno}`);
            await page.screenshot({ path: path.join(__dirname, `../public/images/${claimno}.png`) });
            client.pushMessage(userId, { type: 'image', originalContentUrl: `${config.host}/${claimno}.png`, previewImageUrl: `${config.host}/${claimno}.png` })
            await browser.close();
          })();
        })
    })
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

