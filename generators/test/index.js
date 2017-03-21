"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        super(args, opts);
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
        this.fs.copyTpl(this.templatePath('controller.js'), this.destinationPath('server/controllers/' + this.options.controllerName + '.js'), {
            controllerName: _.toLower(this.options.controllerName),
            ControllerName: _.capitalize(this.options.controllerName),
        });
    }
};
//# sourceMappingURL=index.js.map