const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const router = new Router()

const views = require('koa-views')
const co = require('co')
const convert = require('koa-convert')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const debug = require('debug')('koa2:server')
const path = require('path')
const mongoose = require('mongoose')

const config = require('./config')
const routes = require('./routes')

const port = process.env.PORT || config.port

// error handler
onerror(app)

// middlewares
app.use(bodyparser())
  .use(json())
  .use(logger())
  .use(require('koa-static')(__dirname + '/public'))
  .use(views(path.join(__dirname, '/views'), {
    options: {settings: {views: path.join(__dirname, 'views')}},
    map: {'njk': 'nunjucks'},
    extension: 'njk'
  }))
  .use(router.routes())
  .use(router.allowedMethods())

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - $ms`)
})

router.get('/', async function (ctx, next) {
  const students=await studentsModel.find({})
  ctx.state = {
    students
  }
  await ctx.render('collection', ctx.state)
})


const { Schema } = mongoose
const studentsSchema = new Schema({
  name:String,
  gender:Number,
  age:Number,
  major:String,
})
const studentsModel = mongoose.model('collections',studentsSchema)
router.post('/collection',async (ctx, next)=>{
  const { name, gender,age,major} = ctx.request.body
  
  let data = {
    name,
    gender,
    age,
    major
  }
  const studentModel = new studentsModel(data)
  await studentModel.save()

  data.status = 'success'
    
  ctx.response.body = data
  
})


async function initConnection() {
  await mongoose.connect('mongodb://localhost/local', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }, (error) => {
    if (error) {
      console.log(error)
    }
    console.log('mongodb connection success')
  })
}
initConnection()



routes(router)
app.on('error', function(err, ctx) {
  console.log(err)
  logger.error('server error', err, ctx)
})

module.exports = app.listen(config.port, () => {
  console.log(`Listening on http://localhost:${config.port}`)
})
