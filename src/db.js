import data from './data'

class Database {
  constructor() {
    this.data = data
  }

  get(modelName) {
    const model = require(`./models/${modelName}/model`).default
    return this.data[modelName].map(m => new model(m))
  }

  set(modelName, datum) {
    var data = this.data[modelName]
    // Note: not writing to file or else will have issues on subsequent test runs
    data[datum.id] = datum
    return data[datum.id]
  }

  delete(modelName, datum) {
    const data = this.data[modelName]
    this.data[modelName] = data.filter(obj => obj.id !== datum.id)
  }
}

export default new Database()
