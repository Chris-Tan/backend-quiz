import db from '../../db'

export const Resolvers = {
  Query: {
    find: (Model) => (unusedFirstParameter, args, context) => {
      return db.get(Model.name).find(function (element, index) {
        if (element.id === args.id)
          return true
        return false
      })
    },
    list: (Model) => (unusedFirstParameter, args, context) => {
      return db.get(Model.name)
    },
  },
  Mutation: {
    delete: (Model) => (unusedFirstParameter, args) => {
      const { input, } = args
      db.delete(Model.name, input)
      return {
        id: input.id,
      }
    }
  }
}
