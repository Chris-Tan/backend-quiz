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
      // Note: ideally we should move "Make" and "Model" columns to a "VehicleType" table, 
      // reference it from the Vehicle table and use that table instead of the "Vehicle" table
      if (db.get('Vehicle').findIndex(vehicle =>
          (vehicle.make == args.input.make && vehicle.model == args.input.model)) === -1) {
        throw new Error('Invalid (make, model) pair.')
      }

      return {
        vehicle: Resolvers.Mutation.create(Model, args)
      }
    }
  },
}
