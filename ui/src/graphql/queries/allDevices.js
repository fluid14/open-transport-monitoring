import gql from 'graphql-tag';

const ALL_DEVICES = gql`
  {
    allDevices {
      name
    }
  }
`;

export default ALL_DEVICES;
