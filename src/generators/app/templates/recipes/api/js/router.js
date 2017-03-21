export default function ({
  config,
  ctrls,
  log,
  koa_router
}) {
  koa_router

  .get('/', async (ctx) => {
    ctx.body = 'ok'
  })
}
