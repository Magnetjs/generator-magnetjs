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
