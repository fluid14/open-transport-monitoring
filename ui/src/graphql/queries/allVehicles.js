import gql from 'graphql-tag';

const ALL_VEHICLES = gql`
  {
    allVehicles {
      vehicleId
      brand
      model
      numberPlate
      deviceId
    }
  }
`;

export default ALL_VEHICLES;
