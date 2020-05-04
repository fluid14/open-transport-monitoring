import { device } from 'aws-iot-device-sdk';

import { IOT_HOST } from '../../config';
import { Certificates } from '../certificates/Certificates';
import DeviceFacade from './DeviceFacade';

class IotHub {

  public getDevice(deviceName: string, certificates: Certificates): DeviceFacade {
    try {
      const iotDevice = new device({
        ...certificates,
        clientId: deviceName,
        host: IOT_HOST
      });

      console.log(`Device connected to hub ${IOT_HOST}`);

      const deviceFacade = new DeviceFacade(iotDevice);
      return deviceFacade;
    } catch(ex) {
      console.log('Device connection error', ex.message);
      throw new Error('Device cannot connect to the hub');
    }
  }

}

export default IotHub;
