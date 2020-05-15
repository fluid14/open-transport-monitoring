import gql from 'graphql-tag';

const SINGLE_VEHICLE = gql`
  query singleVehicle($vehicleId: String!) {
    singleVehicle(vehicleId: $vehicleId) {
      Brand
      Model
      NumberPlate
    }
  }
`;

export default SINGLE_VEHICLE;
