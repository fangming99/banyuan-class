const controller=require('../controller/collection')

module.exports=function(router){
  router.get('/', controller.collection)
  router.post('/collection',controller.addStudent)
}

// router.get('/', async function (ctx, next) {
//   const students=await studentsModel.find({}).lean()
//   ctx.state = {
//     students
//   }
//   await ctx.render('collection', ctx.state)
// })


// const { Schema } = mongoose
// const studentsSchema = new Schema({
//   name:String,
//   gender:Number,
//   age:Number,
//   major:String,
// })
// const studentsModel = mongoose.model('collections',studentsSchema)
// router.post('/collection',async (ctx, next)=>{
//   const { name, gender,age,major} = ctx.request.body
  
//   let data = {
//     name,
//     gender,
//     age,
//     major
//   }
//   const studentModel = new studentsModel(data)
//   await studentModel.save()

//   data.status = 'success'
    
//   ctx.response.body = data
  
// })


