const users = require("./users")

let usersInfoList = []

const usersInfo = {
  setUserInfo: (userInfo) => {
    let index = usersInfoList.findIndex(({ userId }) => userId === userInfo.userId)
    index !== -1 ? usersInfoList[index] = userInfo :
      usersInfoList.push(userInfo)
  },
  getUserInfo: (userId) => usersInfoList.find(userInfo => userId === userInfo.userId),
}

module.exports = usersInfo 