export default function ({
  config,
  ctrls,
  log,
  koa_router
}) {
  koa_router

  .get('/<%= this.name %>', async (ctx) => {
    ctx.body = 'ok'
  })
}
