const collection = require('./collection')
const users=require('./user')


module.exports = (router) => {
  collection(router)
  users(router)

}
