import gql from 'graphql-tag';

const DEVICE_MESSAGE = gql`
  subscription deviceMessage($deviceId: String!) {
    deviceMessage(deviceName: $deviceId) {
      deviceName
      speed
      rpm
      oilTemperature
      oilPressure
      fuelLevel
      fuelConsumption
      fuelRange
      tyresPressure
      mileage
      rideTime
      position
      errors {
        engine
        oilLevel
        coolantTemperature
        battery
        abs
        powerSteering
      }
    }
  }
`;

export default DEVICE_MESSAGE;
