var _ = require('lodash');
var Generator = require('yeoman-generator');

class MyBase extends Generator {
  helper() {
    console.log('methods on the parent generator won\'t be called automatically');
  }
}

module.exports = class extends MyBase {
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts)

    // this.helperMethod = function () {
    //   console.log('won\'t be called automatically');
    // };
    //
    // // This makes `appname` a required argument.
    this.argument('controllerName', { type: String, required: true });
    //
    // // And you can then access it later; e.g.
    // this.log(this.options.appname);
    //
    // // This method adds support for a `--coffee` flag
    // this.option('typescript');
    //
    // // And you can then access it later; e.g.
    // this.scriptSuffix = (this.options.typescript ? ".ts": ".js");
    // console.log(this.scriptSuffix);
  }

  writing() {
    console.log(this.options.controllerName);
    this.fs.copyTpl(
      this.templatePath('controller.js'),
      this.destinationPath('server/controllers/' + this.options.controllerName + '.js'),
      {
        controllerName: _.toLower(this.options.controllerName),
        ControllerName: _.capitalize(this.options.controllerName),
      }
    );
  }

  // exec() {
  //   this.helper();
  // }

  // prompting() {
  //   return this.prompt([{
  //     type    : 'input',
  //     name    : 'name',
  //     message : 'Your project name',
  //     default : this.appname // Default to current folder name
  //   }, {
  //     type    : 'confirm',
  //     name    : 'cool',
  //     message : 'Would you like to enable the Cool feature?'
  //   }]).then((answers) => {
  //     this.log('app name', answers.name);
  //     this.log('cool feature', answers.cool);
  //   });
  // }

  // method1() {
  //   this.log('method 1 just ran');
  //   console.log(this.destinationRoot());
  //   console.log(this.sourceRoot());
  //   console.log(this.templatePath('index.js'));
  //
  //   // this._private_method()
  // }
  //
  // blabla() {
  //   this.log('method 2 just ran');
  //   // this.yarnInstall(['magnet-core']);
  // }
  //
  // _private_method() {
  //   this.log('run in _private_method');
  // }
};
