const Generator = require('yeoman-generator')
const { capitalize } = require('lodash')

const { BasicQuestion } = require('../../utils/generator')

module.exports = class extends BasicQuestion {
  prompting() {
    return this.prompt([{
      type: 'input',
      name: 'npmModule',
      message: 'You\'re building Magnet\'s module for which NPM module?',
      store: true,
    }])
    .then((answers) => {
      this.config.set(answers)
      this.options.moduleName = `magnet-${answers.npmModule}`

      return this.basicQuestion()
    })
    .then((answers) => {
      this.config.set(answers)

      return this.prompt([{
        type: 'list',
        name: 'language',
        message: 'Which language would you like to use?',
        store: true,
        choices: [{
          name: 'Typescript',
          value: 'ts'
        }, {
          name: 'Javascript',
          value: 'js'
        }]
      }, {
        type: 'confirm',
        name: 'includeFly',
        message: 'Would you like to flyjs to build?',
        store: true,
      }, {
        type: 'confirm',
        name: 'fromDist',
        message: 'Would you like to distribute from dist folder?',
        default: false,
        store: true,
      }])
    })
    .then((answers) => {
      this.config.set(answers)
    })
  }

  packageJSON() {
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      this.config.getAll()
    )
  }

  license() {
    this.composeWith(require.resolve('generator-license'), {
      name: this.config.get('name'), // (optional) Owner's name
      email: this.config.get('email'), // (optional) Owner's email
      website: this.config.get('website'), // (optional) Owner's website
      license: this.config.get('license'), // (optional) Select a license, so no license prompt will happen, in case you want to handle it outside of this generator
    })
  }

  git() {
    this.fs.copy(
      this.templatePath('gitignore'),
      this.destinationPath('.gitignore'))
  }

  editorConfig() {
    this.fs.copy(
      this.templatePath('editorconfig'),
      this.destinationPath('.editorconfig')
    )
  }

  flyfile() {
    this.fs.copy(
      this.templatePath('flyfile.js'),
      this.destinationPath('flyfile.js')
    )
  }

  readMe() {
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      {
        npmModule: this.config.get('npmModule')
      }
    )
  }

  source() {
    const lang = this.config.get('language')
    const moduleName = this.config.get('npmModule')
    const moduleNameCap = capitalize(moduleName)

    this.fs.copyTpl(
      this.templatePath(`${lang}/config.${lang}`),
      this.destinationPath(`src/config/${moduleName}.${lang}`),
      { moduleName, moduleNameCap }
    )
    this.fs.copyTpl(
      this.templatePath(`${lang}/index.${lang}`),
      this.destinationPath(`src/index.${lang}`),
      { moduleName, moduleNameCap }
    )
  }

  yarn() {
    this.yarnInstall(['magnet-core'])

    if (this.config.get('includeFly')) {
      this.yarnInstall([
        'fly',
        'fly-clear',
        'fly-esnext',
        'fly-flatten',
        'fly-typescript',
        'fly-watch',
      ], { 'dev': true })
    }
  }
}
