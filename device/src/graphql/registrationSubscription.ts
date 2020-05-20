export const deviceRegistrationSubscription = (deviceName: string) => `
  subscription {
    registeredDevice(name: "${deviceName}") {
      name
      registered
    }
  }
`;