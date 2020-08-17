const controller = require('../controller/user')

module.exports = (router) => {

  router.get('/user', controller.user)
  router.post('/user/checkName',controller.checkName)
  router.post('/user/regist',controller.regist)
  router.post('/user/login',controller.login)


}
