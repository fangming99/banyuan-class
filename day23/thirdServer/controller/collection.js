const services = require('../services/collection')
/* 
 *  student 页面
*/
async function collection(ctx, next) {
  const students=await services.getStudent({})
  ctx.state={
    students
  }
  await ctx.render('collection',ctx.state)
}

/* 
 * 增加学生
*/
async function addStudent(ctx, next) {
  const data = ctx.request.body
  let result =await  services.addStudent(data)
  result.students=await services.getStudent({})
  ctx.response.body = result
}


module.exports = {
  collection,
  addStudent
}
