import client from 'awsClient';
import DEVICES_LAST_MESSAGE from 'graphql/queries/devicesLastMessage';

const getDevicesLastMessage = setState => {
  client
    .query({
      query: DEVICES_LAST_MESSAGE,
    })
    .then(result => {
      const {
        data: { devicesLastMessage },
      } = result;
      const filteredDevices = devicesLastMessage.filter(device => device.message !== null);
      const vehiclesPosition = filteredDevices.map(device => device.message.data.position);
      setState(devicesLastMessage, vehiclesPosition);
    })
    .catch(error => {
      console.log(error);
    });
};

export default getDevicesLastMessage;
