import gql from 'graphql-tag';

const SINGLE_VEHICLE = gql`
  query singleVehicle($vehicleId: String!) {
    singleVehicle(vehicleId: $vehicleId) {
      deviceId
      brand
      model
      numberPlate
      insuranceDate
      inspectionDate
    }
  }
`;

export default SINGLE_VEHICLE;
