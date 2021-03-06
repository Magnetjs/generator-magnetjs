"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const generator_1 = require("../../utils/generator");
module.exports = class extends generator_1.BasicQuestion {
    prompting() {
        return __awaiter(this, void 0, void 0, function* () {
            let answers;
            answers = yield this.basicQuestion();
            this.config.set(answers);
            answers = yield this.prompt([
                {
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
                },
                {
                    type: 'list',
                    name: 'recipe',
                    message: 'Which recipe would you prefer?',
                    store: true,
                    choices: [{
                            name: 'Api',
                            value: 'api'
                        }, {
                            name: 'Command',
                            value: 'cli'
                        }]
                },
            ]);
            this.config.set(answers);
            if (answers.recipe === 'api') {
                answers = yield this.prompt([
                    {
                        type: 'rawlist',
                        name: 'server',
                        message: 'Which server would you like to use?',
                        store: true,
                        choices: [{
                                name: 'Koa',
                                value: 'koa'
                            }, {
                                name: 'Express',
                                value: 'express'
                            }, {
                                name: 'Both',
                                value: 'both'
                            }, {
                                name: 'Skip',
                                value: 'skip'
                            }]
                    },
                    {
                        type: 'confirm',
                        name: 'includeGreenlock',
                        message: 'Would you like to use greenlock(letsencrypt)?',
                        store: true,
                    },
                ]);
                this.config.set(answers);
            }
            if (answers.includeGreenlock) {
                answers = yield this.prompt([
                    {
                        type: 'list',
                        name: 'tlsServer',
                        message: 'Which https server would you like to use?',
                        store: true,
                        choices: [{
                                name: 'Https',
                                value: 'https'
                            }, {
                                name: 'Spdy',
                                value: 'spdy'
                            }]
                    },
                ]);
                this.config.set(answers);
            }
            answers = yield this.prompt([
                {
                    type: 'rawlist',
                    name: 'orm',
                    message: 'Which orm/odm would you like to use?',
                    store: true,
                    choices: [{
                            name: 'Sequelize',
                            value: 'sequelize'
                        }, {
                            name: 'Mysql',
                            value: 'mongoose'
                        }, {
                            name: 'Both',
                            value: 'both'
                        }, {
                            name: 'Skip',
                            value: 'skip'
                        }]
                },
            ]);
            this.config.set(answers);
            if (answers.orm === 'sequelize' || answers.orm === 'both') {
                answers = yield this.prompt([
                    {
                        type: 'rawlist',
                        name: 'sequelizeAdapter',
                        message: 'Which database would you like to use?',
                        store: true,
                        choices: [{
                                name: 'Postgres',
                                value: 'pg'
                            }, {
                                name: 'Mysql',
                                value: 'mysql2'
                            }, {
                                name: 'Sqlite',
                                value: 'sqlite3'
                            }, {
                                name: 'MSSQL',
                                value: 'tedious'
                            }]
                    },
                ]);
                this.config.set(answers);
            }
            answers = yield this.prompt([
                {
                    type: 'confirm',
                    name: 'includePrimus',
                    message: 'Do you want to use Primus for websocket?',
                    store: true,
                },
            ]);
            this.config.set(answers);
            if (answers.includePrimus) {
                answers = yield this.prompt([{
                        type: 'rawlist',
                        name: 'primusTransport',
                        message: 'Which transport would you like to use?',
                        store: true,
                        choices: [{
                                name: 'BrowserChannel',
                                value: 'browserchannel'
                            }, {
                                name: 'Engine.IO',
                                value: 'engine.io'
                            }, {
                                name: 'Faye',
                                value: 'faye-websocket'
                            }, {
                                name: 'SockJS',
                                value: 'sockjs'
                            }, {
                                name: 'uws',
                                value: 'uws'
                            }]
                    }]);
                this.config.set(answers);
            }
        });
    }
    // prompting() {
    //   return this.prompt([{
    //     type: 'input',
    //     name: 'moduleName',
    //     message: 'Your module name',
    //     store: true,
    //     default: this.config.get('moduleName') || this.appname.replace(' ', '-') // Default to current folder name
    //   }, {
    //     type: 'list',
    //     name: 'language',
    //     message: 'Which language would you like to use?',
    //     store: true,
    //     choices: [{
    //       name: 'Typescript',
    //       value: 'ts'
    //     }, {
    //       name: 'Javascript',
    //       value: 'js'
    //     }]
    //   }]).then((answers) => {
    //     this.config.set({
    //       moduleName: answers.moduleName,
    //       language: answers.language
    //     })
    //   });
    // }
    packageJSON() {
        this.fs.copyTpl(this.templatePath('_package.json'), this.destinationPath('package.json'), {
            moduleName: this.config.get('moduleName'),
            lang: this.config.get('language'),
        });
    }
    license() {
        this.composeWith(require.resolve('generator-license'), {
            name: this.config.get('name'),
            email: this.config.get('email'),
            website: this.config.get('website'),
            license: this.config.get('license'),
        });
    }
    prepareGeneralFile() {
        const lang = this.config.get('language');
        const files = [
            ['gitignore', '.gitignore'],
            ['editorconfig', '.editorconfig'],
            ['README.md', 'README.md'],
            ['tsconfig.json', 'tsconfig.json'],
            [`recipes/api/${lang}/config.${lang}`, `src/config/magnet.${lang}`]
        ];
        for (const [fromFile, toFile] of files) {
            this.fs.copy(this.templatePath(fromFile), this.destinationPath(toFile));
        }
    }
    source() {
        const modules = [
            { module: 'config', options: `!env.dev && { baseDirPath: process.cwd() + '/dist' }` },
            { module: 'bunyan' },
        ];
        const server = this.config.get('server');
        if (server === 'koa') {
            modules.push({ module: 'koa' });
        }
        if (server === 'express') {
            modules.push({ module: 'express' });
        }
        if (server === 'both') {
            modules.push([
                { module: 'koa' },
                { module: 'express' },
            ]);
        }
        const driverModules = [];
        if (this.config.get('includeGreenlock')) {
            driverModules.push({ module: 'greenlock-express', env: 'prod' });
        }
        const orm = this.config.get('orm');
        if (orm === 'sequelize' || orm === 'both') {
            driverModules.push({ module: 'sequelize' });
        }
        if (orm === 'mongoose' || orm === 'both') {
            driverModules.push({ module: 'mongoose' });
        }
        driverModules.push({ module: 'router' });
        modules.push(driverModules);
        modules.push({ module: 'folder-loader' });
        // [
        //   'koa/callback'
        //   'sequelize/relationship'
        // ]
        if (this.config.get('includePrimus') && this.config.get('includeGreenlock')) {
            modules.push([
                { module: 'http' },
                { module: this.config.get('tlsServer'), env: 'prod' }
            ]);
        }
        else if (this.config.get('includePrimus')) {
            modules.push({ module: 'http' });
        }
        else if (this.config.get('includeGreenlock')) {
            modules.push({ module: this.config.get('tlsServer'), env: 'prod' });
        }
        if (this.config.get('includePrimus')) {
            modules.push({ module: 'primus' });
            modules.push({ module: 'folder-loader', options: `{ folders: [{ path: 'src/routers/ws' }]}` });
        }
        // if (server === 'koa') {
        //   modules.push({ module: 'koa/start')
        // }
        // if (server === 'express') {
        //   modules.push({ module: 'express/start')
        // }
        // if (server === 'both') {
        //   modules.push(['koa/start', 'express/start'])
        // }
        if (this.config.get('includePrimus') && this.config.get('includeGreenlock')) {
            modules.push([
                { module: 'http/start' },
                { module: 'https/start', env: 'prod' },
            ]);
        }
        else if (this.config.get('includePrimus')) {
            modules.push({ module: 'http/start' });
        }
        else if (this.config.get('includeGreenlock')) {
            modules.push({ module: `${this.config.get('tlsServer')}/start` });
        }
        const lang = this.config.get('language');
        const moduleName = this.config.get('moduleName');
        const ModuleName = lodash_1.capitalize(moduleName);
        this.fs.copyTpl(this.templatePath(`recipes/api/js/api.js`), this.destinationPath(`src/api.${lang}`), { moduleName, ModuleName, modules });
        this.fs.copyTpl(this.templatePath(`recipes/api/js/router.js`), this.destinationPath(`src/routers/http/index.${lang}`), { moduleName, ModuleName, modules });
        // for (const file of ['index', 'config']) {
        //   this.fs.copy(
        //     this.templatePath(`${lang}/${file}.${lang}`),
        //     this.destinationPath(`src/${file}.${lang}`),
        //     { moduleName, ModuleName, modules }
        //   );
        // }
    }
    yarn() {
        const modules = [
            'bunyan',
            'ts-node',
            'nodemon',
            'magnet-core',
            'magnet-config',
            'magnet-bunyan',
            'magnet-folder-loader',
            // TODO: Put it as an option later?
            'magnet-router',
        ];
        const server = this.config.get('server');
        if (server === 'koa' || server === 'both') {
            modules.push('magnet-koa');
        }
        if (server === 'express' || server === 'both') {
            modules.push('magnet-express');
        }
        if (this.config.get('includeGreenlock')) {
            modules.push('magnet-greenlock-express');
            modules.push(`magnet-${this.config.get('tlsServer')}`);
        }
        if (this.config.get('includePrimus')) {
            modules.push('magnet-primus');
            modules.push('magnet-http');
            modules.push(this.config.get('primusTransport'));
        }
        const orm = this.config.get('orm');
        if (orm === 'sequelize' || orm === 'both') {
            modules.push('magnet-sequelize');
            const adapter = this.config.get('sequelizeAdapter');
            modules.push(adapter);
            if (adapter === 'pg') {
                modules.push('pg-hstore');
            }
        }
        if (orm === 'mongoose' || orm === 'both') {
            modules.push('magnet-mongoose');
        }
        this.yarnInstall(modules);
    }
};
//# sourceMappingURL=index.js.map