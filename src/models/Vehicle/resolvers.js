import db from '../../db'
import Model from './model'
import { Resolvers, } from '../../utils'

export default {
  Query: {
    vehicles: Resolvers.Query.list(Model),
    vehicle: Resolvers.Query.find(Model),
  },
  Mutation: {

  },
}
