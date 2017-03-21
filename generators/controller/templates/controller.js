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
  class <%= Name %>Controller extends Controller {
    // @authenticatedDeco()
    // async list (params, state) {
    //   return []
    // }
  }

  return new <%= Name %>Controller('<%= name %>')
}
