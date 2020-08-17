const {insertOne,find} = require('../models/collection')
const moment=require('moment')


/*
 * 增加学生
 */
async function addStudent(data) {

  // 。。。
  const {
    name
  } = data

  let result = {
    status: 'success'
  }

  if (name) {

    // 插入数据库
    await insertOne(data)
  } else {

    result.status = 'falied'
    result.message = '没有用户名'
  }

  return result
}


//获取学生v
async function getStudent(query) {
  return await find(query)
}

module.exports = {
  addStudent,
  getStudent
}
