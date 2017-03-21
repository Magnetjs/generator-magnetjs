const path = {
  template: 'src/**/templates/**/*',
  generator: 'src/*/*/*.ts',
}

export default async function (fly) {
  await fly.start('build')
  await fly.watch(path.generator, ['compileTypescript'])
  // await fly.watch(path.util, ['compileTypescript'])
  await fly.watch(path.template, ['copyTemplates'])
}

export async function build(fly) {
  await fly.serial([
    'clean',
    'compileTypescript',
    'copyTemplates'
  ]);
}

export async function clean(fly) {
  await fly.clear('generators');
  await fly.clear('utils');
}

export async function copyTemplates(fly) {
  await fly
    .source(path.template)
    .target('./');
}

export async function compileTypescript(fly) {
  await fly
    .source(path.generator)
    .typescript({
      "sourceMap": true,
      "declaration": true,
      "skipLibCheck": true,
      "target": "es6",
      "moduleResolution": "node",
      "module": "commonjs",
      "outDir": "./dist",
      "types": [
        "node",
        "lodash",
        "yeoman-generator"
      ]
    })
    .target('./');
}
