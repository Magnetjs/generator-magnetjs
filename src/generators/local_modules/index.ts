var { Base } = require('../../utils/generator');

class BasicGenerator extends Base {
  writing() {
    this.fs.copyTpl(
      this.templatePath('local_modules.js'),
      this.destinationPath(`local_modules/${this.name}/index.js`),
      {
        name: this.name,
        Name: this.Name,
      }
    );
    this.fs.copyTpl(
      this.templatePath('local_modules_config.js'),
      this.destinationPath(`local_modules/${this.name}/config/${this.name}.js`),
      {
        name: this.name,
        Name: this.Name,
      }
    );
  }
}


module.exports = class extends BasicGenerator {
  exec() {
    this.writing();
  }
};
