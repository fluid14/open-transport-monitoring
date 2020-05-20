import IotHub from './device/IotHub';
import GraphqlClient from './graphql/GraphqlClient';
import CertificatesRepository from './certificates/CertificatesRepository';
import CertificatesService from './certificates/CertificatesService';
import DeviceService from './device/DeviceService';
import DeviceMessage from './device/DeviceMessage';
import Simulation from './simulator/Simulation';

class App {

  private getDeviceNameFromParams(): string {
    return process.argv
      .find(arg => /^name=/.test(arg))
      .replace("name=", "")
  }

  public async bootstrap(): Promise<void> {
    const deviceName = this.getDeviceNameFromParams();
    const certificatesRepository = new CertificatesRepository(deviceName);
    const certificatesService = new CertificatesService(certificatesRepository);
    const graphql = new GraphqlClient();
    const iotHub = new IotHub();
    const deviceService = new DeviceService(iotHub, graphql, certificatesService);
    const simulation = new Simulation();

    console.log('Starting device...');
    console.log('\x1b[33m', '🚀  Device Name:', deviceName, '\x1b[0m');

    try {
      const device = await deviceService.getDevice(deviceName);

      simulation.start(async (message: DeviceMessage) => {
        await device.publish('iot/device', JSON.stringify({ deviceName, ...message }))
      });

    } catch(ex) {
      console.error('Error', ex.message);
    }
  }

}

export default App;
