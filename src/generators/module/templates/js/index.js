import { Module } from 'magnet-core/module'
import * as <%= moduleName %> from '<%= moduleName %>'

export default class Magnet<%= Name %> extends Module {
  get moduleName () { return '<%= moduleName %>' }
  get defaultConfig () { return __dirname }

  async setup () {
    // this.insert(new Fly(this.config))
    // await this.app.fly.start(this.config.start)
  }

  // async teardown () {
  // }
}
