import logging
from botocore.exceptions import ClientError

# Logger setup
logger = logging.getLogger()
logger.setLevel(logging.INFO)


class Device:
    def __init__(self, iot_client):
        self.iot_client = iot_client

    def create(self, device_name):
        device = self.iot_client.create_thing(thingName=device_name)

        return {
            'deviceName': device['thingName'],
            'deviceArn': device['thingArn']
        }

    def list_all(self):
        devices = self.iot_client.list_things()

        devices_map = map(
            lambda thing: {
                'name': thing['thingName'],
                'arn': thing['thingArn']
            },
            devices['things']
        )

        return list(devices_map)

    def check_if_exists(self, device_name):
        try:
            # Try to fetch thing description to check if has been registered
            self.iot_client.describe_thing(thingName=device_name)
            return True
        except ClientError as e:
            logger.log(e)
            return False
