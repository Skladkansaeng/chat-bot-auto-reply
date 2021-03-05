const line = require('@line/bot-sdk');

const client = new line.Client({
  channelAccessToken: 'hzBscKL8bbISAeHUqPw9lpijYsEQxqEfildkJOLVoQ66+KQJyiBFvUmO/otUmBFyjC3lxWJfW6FWlgs6sZQdmNjdij1PwIXKhvTUYCamKCanMOtuloJjK8VJmIVZKAxKS0zwGU0H470z1lhvEFJ0zwdB04t89/1O/w1cDnyilFU='
});

module.exports = { client }