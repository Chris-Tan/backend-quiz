import db from '../../db'
import Model from './model'
import { Resolvers, } from '../../utils'

export default {
  Query: {
    vehicles: Resolvers.Query.list(Model),
    vehicle: Resolvers.Query.find(Model),
  },
  Mutation: {
    createVehicle: (obj, args, context, info) => {
      return Model.isValidConfiguration(args.input).then(isValid => {
        if (!isValid)
          throw new Error('Invalid (make, model) pair.')
        return {
          vehicle: Resolvers.Mutation.create(Model, args)
        }
      })
    },
    updateVehicle: (obj, args, context, info) => {
      return Model.isValidConfiguration(args.input).then(isValid => {
        if (!isValid)
          throw new Error('Invalid (make, model) pair.')
        return {
          vehicle: Resolvers.Mutation.update(Model, args)
        }
      })
    },
  },
}
