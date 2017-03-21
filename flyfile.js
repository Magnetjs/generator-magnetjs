const path = {
  template: 'src/**/templates/**/*',
  generators: 'src/generators/*/*.ts',
  utils: 'src/utils/*.ts',
}

export default async function (fly) {
  await fly.start('build')
  await fly.watch(path.generators, ['compileGenerators'])
  await fly.watch(path.utils, ['compileUtils'])
  await fly.watch(path.template, ['copyTemplates'])
}

export async function build(fly) {
  await fly.serial([
    'clean',
    'compileGenerators',
    'compileUtils',
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

export async function compileGenerators(fly) {
  await fly
    .source(path.generators)
    .typescript({
      "sourceMap": true,
      "declaration": true,
      "skipLibCheck": true,
      "target": "es6",
      "moduleResolution": "node",
      "module": "commonjs",
      "types": [
        "node",
        "lodash",
        "yeoman-generator"
      ]
    })
    .target('generators');
}

export async function compileUtils(fly) {
  await fly
    .source(path.utils)
    .typescript({
      "sourceMap": true,
      "declaration": true,
      "skipLibCheck": true,
      "target": "es6",
      "moduleResolution": "node",
      "module": "commonjs",
      "types": [
        "node",
        "lodash",
        "yeoman-generator"
      ]
    })
    .target('utils');
}
