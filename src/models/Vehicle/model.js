import db from '../../db'
import BaseModel from '../BaseModel'

export default class Vehicle extends BaseModel {
  static async vehicleSearch(params) {
    return db.get('Vehicle').filter(vehicle => {
      for (var key in params) {
        if (vehicle[key] !== params[key])
          return false
      }
      return true
    })
  }

  // Note: ideally we should move "Make" and "Model" columns to a "VehicleType" table, 
  // reference it from the Vehicle table and use that table instead of the "Vehicle" table
  static async isValidConfiguration(params) {
    const results = await Vehicle.vehicleSearch({
      // vehicleId: params.vehicleId,
      // engineConfigId: params.engineConfigId,
      // transmissionControlTypeId: params.transmissionControlTypeId,
      make: params.make,
      model: params.model,
    })
    return results.length > 0
  }
}
