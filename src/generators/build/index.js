var { Basic } = require('../../utils/generator');

module.exports = class extends Basic {
  exec() {
    this.writing('build');
  }
};
