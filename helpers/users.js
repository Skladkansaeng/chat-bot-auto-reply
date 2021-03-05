let usersList = []

const users = {
  storeUser: (source) => {
    !usersList.find(({ userId }) => userId === source.userId) && usersList.push(source)
  },
  getUsers: () => usersList
}

module.exports = users 