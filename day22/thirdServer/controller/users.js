async function welcome(ctx, next) {
  await ctx.render('index')
}
module.exports = {
  welcome
}
