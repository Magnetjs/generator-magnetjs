# MagnetJS generator

> Yeoman generator for MagnetJS - lets you quickly set up a project with sensible defaults and best practices.

## Usage

For step-by-step instructions on using Yeoman and this generator to build a Koa api server from scratch

Install `yo`, `generator-magnetjs`:
```
yarn global add yo generator-magnetjs
```

Make a new directory, and `cd` into it:
```
mkdir my-new-project && cd $_
```

Run `yo magnetjs`, optionally passing an app name:
```
yo magnetjs [app-name]
```


## Generators

Available generators:

* [magnetjs](#app) (aka [magnetjs:app](#app))
* [magnetjs:controller](#controller)
* [magnetjs:model](#model)
* [magnetjs:queue](#queue)
* [magnetjs:router](#router)
* [magnetjs:scheduler](#scheduler)
* [magnetjs:schema](#schema)
* [magnetjs:service](#service)
* [magnetjs:build](#build)
* [magnetjs:util](#util)

* [magnetjs:local_modules](#local_modules)
* [magnetjs:module](#module)

### App
Sets up a new Magnet app, generating all the boilerplate you need to get started. The app generator also optionally additional MagnetJS modules, such as magnet-config (installed by default).

Example:
```bash
yo magnetjs
```

### Controller
Generates a controller

Example:
```bash
yo magnetjs:controller user
```

Produces `server/controllers/mycontroller.js`:
```javascript
export default function ({
  config,
  log,
  acl,
  models,
  utils: {
    blueprint: { Controller },
    // permission: { authenticatedDeco, isAllowedDeco }
  }
}) {
  class UserController extends Controller {
    // @authenticatedDeco()
    // async list (params, state) {
    //   return []
    // }
  }

  return new UserController('user')
}
```

### Router
Generates a router in `app/scripts/controllers`.

Example:
```bash
yo magnetjs:router user
```

Produces `server/routers/graphql/user.js`:
```javascript
import { graphqlToController } from '../../utils/route'

export default function (app) {
  const Query = {
    // companys: graphqlToController(app, 'company', 'list'),
  }

  const Mutation = {
    // createCompany: graphqlToController(app, 'company', 'create'),
  }

  return { Query, Mutation }
}
```

Example:
```bash
yo magnetjs:router user --type http
```

Produces `server/routers/http/user.js`:
```javascript
export default function ({
  config,
  ctrls,
  log,
  koa_router
}) {
  koa_router

  .get('/', async (ctx) => {
    ctx.body = 'ok'
  })
}
```

## Options
In general, these options can be applied to any generator, though they only affect generators that produce scripts.

### TypeScript
For generators that output scripts, the `--typescript` will output TypeScript instead of JavaScript.

For example:
```bash
yo magnetjs:controller user --typescript
```

Produces `app/scripts/controller/user.ts`:
```typescript
```
