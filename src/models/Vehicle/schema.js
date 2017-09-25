
export default `
type Vehicle {
  id: Int!
  model: String
  make: String
  year: Int
}

type Query {
  vehicles: [Vehicle]
  vehicle(id: Int!): Vehicle
}

type Mutation {
  createVehicle(input: CreateVehicleInput!): VehiclePayload
  updateVehicle(input: UpdateVehicleInput!): VehiclePayload
}

input CreateVehicleInput {
  model: String
  make: String
  year: Int
}

input UpdateVehicleInput {
  id: Int!
  model: String
  make: String
  year: Int
}

type VehiclePayload {
  vehicle: Vehicle
}`
