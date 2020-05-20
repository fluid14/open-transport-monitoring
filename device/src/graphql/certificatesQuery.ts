export const certificatesQuery = (deviceName: string) => `
  query {
    deviceCertificates(deviceName: "${deviceName}")
  }
`;
