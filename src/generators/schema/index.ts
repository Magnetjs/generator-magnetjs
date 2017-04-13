import { Basic } from '../../utils/generator'

module.exports = class extends Basic {
  exec() {
    const destPath = `src/schemas/${this.name}.js`
    this._writing('schema.js', destPath)
  }
};
