import gql from 'graphql-tag';

const VEHICLE_PARAMETER_LIMITS = gql`
    vehicleParameterLimits{
        name
        min
        max
        unit
    }
`;

export default VEHICLE_PARAMETER_LIMITS;
