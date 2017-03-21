import { asynify } from '../utils/promise'

export default function ({
  kue,
  config,
  log
}) {
  kue.process('processName', asynify(log, async function ({ data }) {
    log.info('success')
  }))
}
