export default function ({
  nodeSchedule,
  log
}) {
  nodeSchedule.scheduleJob(
    '* * * * * *',
    async function process () {
      log.info('hi')
    }
  )
}
