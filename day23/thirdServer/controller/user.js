const service = require('../services/user')
const { checkName:checkRegName } = require('../common/utils')

async function user(ctx, next) {
  await ctx.render('user')
}

async function checkName(ctx, next) {
  const {
    name
  } = ctx.request.body
  let data = await service.checkName(name)
  ctx.response.body = data
}



async function regist(ctx, next) {

  const {
    name,
    password
  } = ctx.request.body

  let data = {
    status: 'success'
  }

  // 检测用户名是否符合要求
  let result = await service.checkName(name)

  if (result.flag) {
    if (service.checkPassword(password)) {
      await service.regist(name, password)
    } else {

      data.status = 'failed'
      data.message = '密码不符合要求'
    }
  } else {
    data.status = 'failed'
    data.message = result.message
  }

  ctx.response.body = data
}



async function login(ctx, next) {
  const {
    name,
    password
  } = ctx.request.body
  let data = {}
  // 检测用户名是否符合要求
  let nameResult = checkRegName(name)
  //检测姓名
  if (nameResult) {
    //检测密码 
    let passwordResult = await service.checkPassword(name)
    if (passwordResult) {
      //查看是否在数据库中
      let loginResult = await service.login(name, password)
      if (loginResult.status === 'success') {
        data.status = 'success'
      }else{
        data=loginResult
      }
    }else{
      data.status='failed'
      data.message='密码不符合要求'
    }
  }else{
    data.status='failed'
    data.message='用'
  }
  ctx.response.body = data
}

module.exports = {
  user,
  checkName,
  regist,
  login
}
