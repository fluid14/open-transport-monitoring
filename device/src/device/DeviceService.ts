import IotHub from './IotHub';
import DeviceFacade from './DeviceFacade';
import CertificatesService from '../certificates/CertificatesService';
import GraphqlClient from '../graphql/GraphqlClient';
import { certificatesQuery } from '../graphql/certificatesQuery';
import { Certificates } from '../certificates/Certificates';
import { deviceRegistrationSubscription } from '../graphql/registrationSubscription';

class DeviceService {

  constructor(
    private iotHub: IotHub,
    private gqlClient: GraphqlClient,
    private certificatesService: CertificatesService
  ) { }

  public async getDevice(deviceName: string): Promise<DeviceFacade> {
    try {
      const certificatesExists = this.certificatesService.checkIfCertificatesExists();

      if (!certificatesExists) {
        console.log('Certificates not exist!');
        const deviceCertificateUrls = await this.getCertificatesOrWaitForThem(deviceName);
        await this.certificatesService.saveCertificates(deviceCertificateUrls);
      }

      const certificates = this.certificatesService.getCerificatesPaths();
      return this.iotHub.getDevice(deviceName, certificates);

    } catch(ex) {
      console.log(ex.message);
      throw ex;
    }
  }

  private async getCertificatesOrWaitForThem(deviceName: string): Promise<Certificates> {
    const deviceCertificateUrls = await this.getRemoteCertificates(deviceName);

    if (!deviceCertificateUrls) {
      console.log('Device not registered. Listening for registration...');
      await this.waitForDevice(deviceName);

      console.log('Refetching certificates...');
      return await this.getRemoteCertificates(deviceName);
    }

    return deviceCertificateUrls;
  }

  private async getRemoteCertificates(deviceName: string): Promise<Certificates> {
    const certificatesResponse = await this.gqlClient.query<[string, string, string]>(
      certificatesQuery(deviceName),
      'deviceCertificates'
    );

    if (!certificatesResponse) {
      return null;
    }

    const [ caPath, certPath, keyPath ] = certificatesResponse;
    return {
      keyPath,
      certPath,
      caPath
    };
  }

  private async waitForDevice(deviceName: string): Promise<void> {
    const query = deviceRegistrationSubscription(deviceName);

    return new Promise((resolve, reject) => {
      const subscription = this.gqlClient
      .subscription(query)
        .filter(({ data }) => data && data.registeredDevice.registered)
        .subscribe({
          next: () => {
            console.log(`Device ${deviceName} has been registered`);
            subscription.unsubscribe();
            resolve();
          },
          error: (error: any) => {
            reject(`Subscription error: ${error.message}`);
          }
        })
      });
  }

}

export default DeviceService;
