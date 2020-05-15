import gql from 'graphql-tag';

const ALL_VEHICLES = gql`
  {
    allVehicles {
      VehicleID
      Brand
      Model
      NumberPlate
    }
  }
`;

export default ALL_VEHICLES;
