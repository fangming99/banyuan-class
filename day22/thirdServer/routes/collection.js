router.get('/', async function (ctx, next) {
  ctx.state = {
    // name,
    // gender,
    // age,
    // major,
  }

  await ctx.render('collection', ctx.state)
})
