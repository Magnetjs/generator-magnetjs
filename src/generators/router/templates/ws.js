export default function ({
  config,
  log,
  primus,
}) {
  // connect hook
  primus.on('connection', (spark) => {
    log.info("connection")
  })

  // disconnect hook
  primus.on('disconnection', (spark) => {
    log.info("disconnection")
  })
}
