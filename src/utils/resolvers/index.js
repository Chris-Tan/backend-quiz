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
      if (input.id)
        throw new Error(`Can't save new object with "id". Did you mean to "update"?`)
      input.id = db.get(Model.name).length + 1
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
