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
const session=require('koa-session')

const config = require('./config')
const routes = require('./routes')

const port = process.env.PORT || config.port

// error handler
onerror(app)
app.keys=['banyuan'];
const CONFIG = {
  key : 'koa.sess'
};

// middlewares
app.use(bodyparser())
  .use(json())
  .use(logger())
  .use(require('koa-static')(__dirname + '/public'))
  .use(views(path.join(__dirname, '/views'), {
    options: {
      settings: {
        views: path.join(__dirname, 'views')
      }
    },
    map: {
      'njk': 'nunjucks'
    },
    extension: 'njk'
  }))
  .use(session(CONFIG,app))
  .use(router.routes())
  .use(router.allowedMethods())

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - $ms`)
})

router.get('/', async (ctx, next) => {
  // ctx.body = 'Hello World'
  let news=[{name:"星期一"},{name:"星期二"},{name:"星期三"}];
  ctx.state = {
    title: ['banyuan','123'],
    male:"女",
    news:news,
    // content:"hello",
  }
  // ctx.session.user={name:'tom'};
  // ctx.session.password='123';
  // console.log('password===>',ctx.session.password);
  await ctx.render('index', ctx.state);
})

let tasks = [{
  name: '任务1',
  checked: false
}, {
  name: '任务2',
  checked: false
}, {
  name: '任务3',
  checked: true
}, {
  name: '任务4',
  checked: false
}, {
  name: '任务5',
  checked: false
}, {
  name: '任务6',
  checked: true
}]

router.get('/todolist', async (ctx, next) => {
  // ctx.body = 'Hello World'

  ctx.state = {

    tasks,
  }

  await ctx.render('todolist', ctx.state)
})

router.post('/checkTask', (ctx, next) => {
  const {
    name,
    checked
  } = ctx.request.body;
  tasks.forEach((item) => {
    if (item.name === name) {
      item.checked = !item.checked;
    }
  });
  console.log(tasks);
  ctx.response.body = {
    status: 'success'
  }

})

router.post('/addTask', (ctx, next) => {
  const {
    name
  } = ctx.request.body;
  tasks.push({
    name,
    // checked:false,
  })
  ctx.response.body = {
    status: 'success'
  }

})

router.post('/closeTask', (ctx, next) => {

  const {
    name
  } = ctx.request.body;

  // let i = search(tasks,name);
  // tasks.splice(i,1);

  let index;
  tasks.forEach((item, i) => {
    if (tasks[i].name === name) {
      index=i;
    }

  })

  tasks.splice(index, 1);
  ctx.response.body = {
    status: 'success'
  }

})

// function search(tasks,name){
//   let i = tasks.length;
//   while(i-=1){
//     console.log(tasks[i].name);
//     console.log('name',name);
//       if (tasks[i].name === name){

//          console.log('in');
//          return i;
//       }
//   }
//   return false;
// }

router.get('/login', async (ctx, next) => {
  await ctx.render("login");

})


router.post('/login', async (ctx, next) => {

  const { name, password} = ctx.request.body;
  let data=JSON.stringify({ name,gender:1})

  // ctx.cookies.set('user', data,{maxAge:4*1000})
  ctx.session.user=data;
  ctx.response.body = {
    status: 'success',
  }
})


router.get('/loginTest', async (ctx, next) => {

  let user=ctx.session.user;

  // if(ctx.cookies.get('user')){
  //   user=JSON.parse(ctx.cookies.get('user'))
  // }
  if(user){
    await ctx.render('test')
  }else{
    ctx.redirect('/login')
  }
})



routes(router)
app.on('error', function (err, ctx) {
  console.log(err)
  logger.error('server error', err, ctx)
})

module.exports = app.listen(config.port, () => {
  console.log(`Listening on http://localhost:${config.port}`)
})
