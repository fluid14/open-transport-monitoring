import boto3
import logging

from Device import Device

# AWS services clients
iot_client = boto3.client('iot')

# Logger setup
logger = logging.getLogger()
logger.setLevel(logging.INFO)

# Core classes
device = Device(iot_client=iot_client)


def get_registered_devices(event, context):
    logger.info('## GETTING ALL DEVICES')
    devices_list = device.list_all()

    logging.info('## DEVICES LIST RECEIVED')
    logging.info(devices_list)

    return devices_list
