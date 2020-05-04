
import * as path from 'path';
import { CERTS_DIRECTORY, CertFiles } from '../constants';
import { Certificates } from './Certificates';
import FileSystem from '../utils/FileSystem';

class CertificatesRepository {

  constructor(private readonly deviceName: string) {}

  public getCertificatesPaths(): Certificates {
    const keyPath = path.join(CERTS_DIRECTORY, this.deviceName, CertFiles.keyPath);
    const certPath = path.join(CERTS_DIRECTORY, this.deviceName, CertFiles.certPath);
    const caPath = path.join(CERTS_DIRECTORY, this.deviceName, CertFiles.caPath);

    return {
      keyPath,
      certPath,
      caPath
    };
  }

  public async saveCertificate(certificate: { name: string; body: NodeJS.ReadableStream }): Promise<void> {
    const fileName = CertFiles[certificate.name];
    const certPath = path.join(CERTS_DIRECTORY, this.deviceName, fileName);

    try {
      console.log('Saving certificate', fileName);
      await FileSystem.save(certPath, certificate.body)
      console.log('Cerfificate saved', certPath);
    } catch (ex) {
      console.log('Certificate saving error', ex.message);
      throw new Error('Certificate save failed');
    }
  }

}

export default CertificatesRepository;
