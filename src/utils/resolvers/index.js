import db from '../../db'

export const Resolvers = {
  Query: {
    find: (Model) => (obj, args, context) => {
      return db.get(Model.name).find(function (element, index) {
        if (element.id === args.id)
          return true
        return false
      })
    },
    list: (Model) => (obj, args, context) => {
      return db.get(Model.name)
    },
  },
  Mutation: {
    create: (Model, args) => {
      const { input, } = args
      return db.set(Model.name, input)
    },
    update: (Model, args) => {
      const { input, } = args
      return db.set(Model.name, input)
    },
    delete: (Model) => (obj, args) => {
      const { input, } = args
      db.delete(Model.name, input)
      return {
        id: input.id,
      }
    },
  }
}
