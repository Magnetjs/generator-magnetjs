export default function ({
  config,
  log,
  acl,
  models,
  utils: {
    blueprint: { Controller },
    // permission: { permission: { notOwner }, authenticatedDeco }
  }
}) {
  class <%= ControllerName %>Controller extends Controller {
    // @authenticatedDeco()
    // async list (params, state) {
    //   return []
    // }
  }

  return new <%= ControllerName %>Controller('<%= controllerName %>')
}
