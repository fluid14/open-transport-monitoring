import { device } from 'aws-iot-device-sdk';

class DeviceFacade {

  constructor(private iotDevice: device) { }

  public publish(topic: string, message: string): Promise<void> {
    const publishOptions = null;

    const publishPromise = new Promise<void>((resolve, reject) => {
      this.iotDevice.publish(
        topic,
        message,
        publishOptions,
        error => {
          if (error) {
            console.log('Error when publishing message', error);
            reject(error)
          }

          console.log(
            `Message published.
            Topic: ${topic}
            Message: ${message}`
          );
          resolve()
        });
    });

    return publishPromise;
  }

}

export default DeviceFacade;
