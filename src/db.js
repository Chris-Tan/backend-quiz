import data from './data'

class Database {
  constructor() {
    this.data = data
  }

  get(modelName) {
    const model = require(`./models/${modelName}/model`).default
    return this.data[modelName].map(m => new model(m))
  }

  // Note: not writing to file or else will have issues on subsequent test runs
  set(modelName, datum) {
    let data = this.data[modelName]
    var index
    var newItem
    // Creating item
    if (!datum.id) {
      newItem = datum
      newItem.id = data.length + 1
      index = data.push(newItem) - 1
    }
    // Updating item
    else {
      index = data.findIndex(e => e.id === datum.id)
      if (index === -1)
        throw new Error('Unable to update nonexistant "id".')
      newItem = data[index]
      for (var key in datum) {
        newItem[key] = datum[key]
      }
      data[index] = newItem
    }
    return data[index]
  }

  delete(modelName, datum) {
    const data = this.data[modelName]
    this.data[modelName] = data.filter(obj => obj.id !== datum.id)
  }
}

export default new Database()
