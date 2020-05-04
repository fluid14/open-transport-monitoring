import Http from '../utils/Http';
import FileSystem from '../utils/FileSystem';

import CertificatesRepository from './CertificatesRepository';
import { Certificates } from './Certificates';

class CertificatesService {

  constructor(private certificatesRepository: CertificatesRepository) { }

  public checkIfCertificatesExists(): boolean {
    const certificates = this.certificatesRepository.getCertificatesPaths();

    return Object
      .values(certificates)
      .reduce((exists, filePath) => exists && FileSystem.checkIfPathExists(filePath), true);
  }

  public getCerificatesPaths(): Certificates {
    return this.certificatesRepository.getCertificatesPaths();
  }

  public async saveCertificates(certificateUrls: Certificates): Promise<void> {
    const certificateSavePromises = Object.entries(certificateUrls)
      .map(([ name, url ]) =>
        Http.getAsStream(url)
          .then(body => this.certificatesRepository.saveCertificate({ name, body }))
      );

    try {
      await Promise.all(certificateSavePromises);
    } catch(ex) {
      console.error(ex.message)
    }
  }

}

export default CertificatesService;
