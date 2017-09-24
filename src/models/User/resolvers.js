import Model from './model'
import { Resolvers, } from '../../utils'
import db from '../../db'
export default {
  Query: {
    users: Resolvers.Query.list(Model),
    user: Resolvers.Query.find(Model),
    profitableUsers: (obj, args, context, info) => {
      // Note: when using real DB then DataLoader can be used to cache data
      // e.g. https://www.youtube.com/watch?v=2cSVIWDUSn4
      let users = db.get('User')
      let vehicles = db.get('Vehicle')
      let orders = db.get('Order')

      var result = users.map(function(user) {
        var spend = 0
        vehicles.filter(vehicle => vehicle.userId === user.id).forEach(function(vehicle) {
          orders.forEach(function(order) {
            if (order.vehicleId === vehicle.id)
              spend += order.price
          })
        })
        return {
          spend: spend,
          user: user,
        }
      }).sort((a, b) => (b.spend - a.spend))
      if (args.top)
        result = result.slice(0, args.top)
      return result
    }
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
