import gql from 'graphql-tag';

const DEVICES_LAST_MESSAGE = gql`
  {
    devicesLastMessage {
      deviceName
      message {
        timestamp
        data {
          rideTime
          position
        }
      }
    }
  }
`;

export default DEVICES_LAST_MESSAGE;
