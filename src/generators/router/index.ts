const shell = require('shelljs');
const pluralize = require('pluralize');

const { Basic } = require('../../utils/generator');

module.exports = class GeneratorRoute extends Basic {
  constructor(args, opts) {
    super(args, opts)

    this.option('http');
    this.option('ws');
    this.option('command');
    this.option('graphql');

    this.type = 'graphql'
    if (this.options.command) {
      this.type = 'commands'
    } else if (this.options.ws) {
      this.type = 'ws'
    } else if (this.options.http) {
      this.type = 'http'
    } else if (this.options.graphql) {
      this.type = 'graphql'
    }
  }

  writing() {
    const destPath = `src/routers/${this.type}/${this.name}.js`

    this._writing(`${this.type}.js`, destPath)
  }
}
