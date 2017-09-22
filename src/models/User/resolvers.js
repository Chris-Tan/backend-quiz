import Model from './model'
import { Resolvers, } from '../../utils'
import db from '../../db'
export default {
  Query: {
    users: Resolvers.Query.list(Model),
    user: Resolvers.Query.find(Model),
  },
  Mutation: {
    deleteUser: Resolvers.Mutation.delete(Model),
  },
  User: {
    displayName: (obj, args, context) => {
      return obj.firstName + " " + ((obj.lastName) ? obj.lastName.charAt(0) + "." : "")
    },
    vehicles: (obj, args, context) => {
      return db.get('Vehicle').filter(vehicle => vehicle.userId === obj.id)
    },
  },
}
