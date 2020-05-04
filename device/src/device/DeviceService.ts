import IotHub from './IotHub';
import DeviceFacade from './DeviceFacade';
import CertificatesService from '../certificates/CertificatesService';
import { Certificates } from '../certificates/Certificates';

class DeviceService {

  constructor(
    private iotHub: IotHub,
    private certificatesService: CertificatesService
  ) { }

  public async getDevice(deviceName: string): Promise<DeviceFacade> {
    try {
      if (!this.certificatesService.checkIfCertificatesExists()) {
        console.log('Certificates not exist')
        const deviceCertificateUrls = await this.getDeviceCertificateUrls(deviceName);
        await this.certificatesService.saveCertificates(deviceCertificateUrls);
      }

      const certificates = this.certificatesService.getCerificatesPaths();
      return this.iotHub.getDevice(deviceName, certificates);

    } catch(ex) {
      console.log(ex.message);
      throw ex;
    }
  }

  public getDeviceCertificateUrls(deviceName: string): Promise<Certificates> {
    const certificatesResponse = {
      keyPath: 'https://transportation-devices-certs.s3.eu-west-2.amazonaws.com/test/privateKey.pem',
      certPath: 'https://transportation-devices-certs.s3.eu-west-2.amazonaws.com/test/certificate.pem',
      caPath: 'https://transportation-devices-certs.s3.eu-west-2.amazonaws.com/rootCa.pem'
    };

    return new Promise((resolve, reject) => {
      resolve(certificatesResponse)
    });
  }

}

export default DeviceService;
