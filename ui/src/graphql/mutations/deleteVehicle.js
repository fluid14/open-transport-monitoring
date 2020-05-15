import gql from 'graphql-tag';

const DELETE_VEHICLE = gql`
  mutation deleteVehicle($vehicleId: String!) {
    deleteVehicle(vehicleId: $vehicleId)
  }
`;

export default DELETE_VEHICLE;
