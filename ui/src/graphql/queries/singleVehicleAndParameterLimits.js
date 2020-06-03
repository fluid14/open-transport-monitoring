import gql from 'graphql-tag';

const SINGLE_VEHICLE_AND_PARAMETER_LIMITS = gql`
  query singleVehicleAndParameterLimits($vehicleId: String!) {
    singleVehicle(vehicleId: $vehicleId) {
      deviceId
      brand
      model
      numberPlate
      insuranceDate
      inspectionDate
    }
    vehicleParameterLimits {
      name
      min
      max
      unit
    }
  }
`;

export default SINGLE_VEHICLE_AND_PARAMETER_LIMITS;
