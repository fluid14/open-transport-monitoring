import gql from 'graphql-tag';

const ADD_VEHICLE = gql`
  mutation addVehicle(
    $deviceId: String!
    $plateNumber: String!
    $brand: String!
    $model: String!
    $insuranceDate: String!
    $inspectionDate: String!
  ) {
    addVehicle(
      deviceId: $deviceId
      numberPlate: $plateNumber
      brand: $brand
      model: $model
      insuranceDate: $insuranceDate
      inspectionDate: $inspectionDate
    ) {
      VehicleID
    }
  }
`;

export default ADD_VEHICLE;
