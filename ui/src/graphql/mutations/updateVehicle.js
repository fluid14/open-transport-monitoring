import gql from 'graphql-tag';

const UPDATE_VEHICLE = gql`
  mutation updateVehicle(
    $vehicleId: String!
    $deviceId: String!
    $plateNumber: String!
    $brand: String!
    $model: String!
    $insuranceDate: String!
    $inspectionDate: String!
  ) {
    updateVehicle(
      vehicleId: $vehicleId
      deviceId: $deviceId
      numberPlate: $plateNumber
      brand: $brand
      model: $model
      insuranceDate: $insuranceDate
      inspectionDate: $inspectionDate
    ) {
      vehicleId
    }
  }
`;

export default UPDATE_VEHICLE;
