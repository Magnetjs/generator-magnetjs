import * as shell from 'shelljs'
import * as _ from 'lodash'
import * as Generator from 'yeoman-generator'
import * as pluralize from 'pluralize'
import * as gitConfig from 'git-config'
import { licenses } from 'generator-license'

export class Base extends Generator {
  name: string
  Name: string
  names: string

  constructor(args, opts) {
    super(args, opts)

    this.argument('name', { type: String, required: true });

    this.name = _.toLower(this.options.name);
    this.Name = _.capitalize(this.options.name);
    this.names = pluralize(this.name)
  }
}

export class Basic extends Base {
  _writing(fromPath, toPath) {
    this.fs.copyTpl(
      this.templatePath(fromPath),
      this.destinationPath(toPath),
      { name: this.name, Name: this.Name, }
    );

    if (shell.exec(`atom ${toPath}`).code !== 0) {
      shell.echo('Error: Open file in Atom failed');
      shell.exit(1);
    }
  }

  writing(type) {
    const types = pluralize(type)
    const destPath = `server/${types}/${this.name}.js`

    this._writing(`${type}.js`, destPath)
  }
}

export class BasicQuestion extends Generator {
  gitc: any
  constructor(args, opts) {
    super(args, opts);

    this.gitc = gitConfig.sync();
    this.gitc.user = this.gitc.user || {};
  }

  basicQuestion() {
    const prompts = [
      {
        type: 'input',
        name: 'moduleName',
        message: 'What\'s your module name:',
        default: this.options.moduleName,
        store: true,
      },
      {
        name: 'name',
        message: 'What\'s your name:',
        default: this.options.name || this.gitc.user.name,
        when: this.options.name === null || this.options.name === undefined,
        store: true,
      },
      {
        name: 'email',
        message: 'Your email (optional):',
        default: this.options.email || this.gitc.user.email,
        when: !this.options.email,
        store: true,
      },
      {
        name: 'website',
        message: 'Your website (optional):',
        default: this.options.website,
        when: !this.options.website,
        store: true,
      },
      {
        type: 'list',
        name: 'license',
        message: 'Which license do you want to use',
        default: this.options.defaultLicense,
        when: !this.options.license || licenses.find(x => x.value === this.options.license) === undefined,
        store: true,
        choices: licenses,
      }
    ];

    return this.prompt(prompts);
  }
}
