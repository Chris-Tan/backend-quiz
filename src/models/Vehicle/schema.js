
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
  createVehicle(input: CreateVehicleInput!): CreateVehiclePayload
}

input CreateVehicleInput {
  id: Int
  make: String
  model: String
  year: Int
}

type CreateVehiclePayload {
  vehicle: Vehicle
}`
