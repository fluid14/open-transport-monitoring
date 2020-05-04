import CertificatesRepository from './certificates/CertificatesRepository';
import IotHub from './device/IotHub';
import CertificatesService from './certificates/CertificatesService';
import DeviceService from './device/DeviceService';
import Simulation from './simulator/Simulation';
import DeviceMessage from './device/DeviceMessage';

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
    const iotHub = new IotHub();
    const deviceService = new DeviceService(iotHub, certificatesService);
    const simulation = new Simulation();

    console.log('Starting device...');
    console.log('\x1b[33m', '🚀  Device Name:', deviceName, '\x1b[0m');

    try {
      const device = await deviceService.getDevice(deviceName);

      simulation.start(async (message: DeviceMessage) => {
        await device.publish('iot/device', JSON.stringify(message))
      });

    } catch(ex) {
      console.error('Error', ex.message);
    }
  }

}

export default App;
