export default function ({ config }) {
  config.fly.tasks = {
    *default(fly) {
      fly.$.log('hi')
      // yield fly.serial(['clean'])
    },
  }
}
