export default function ({
  config,
  ctrls,
  log,
  koa_router
}): void {
  koa_router

  .get('/', async (ctx): void => {
    ctx.body = 'ok'
  })
}
