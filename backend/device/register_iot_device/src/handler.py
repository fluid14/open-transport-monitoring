import json
import os
import boto3
import logging

from Device import Device
from QueueHelper import QueueHelper

# Environment variables
device_registered_topic = os.environ['IOT_DEVICE_REGISTERED_TOPIC']

# AWS services client
sns_client = boto3.client('sns')
iot_client = boto3.client('iot')

# Logger setup
logger = logging.getLogger()
logger.setLevel(logging.INFO)

# Core classes
device = Device(iot_client=iot_client)
queue = QueueHelper(sns_client=sns_client)


def register_iot_device(event, context):
    logger.info('## RECEIVED EVENT')
    logger.info(event)

    device_name = event['name']

    created_device = device.create(device_name)
    logger.info('## CREATED DEVICE')
    logger.info(created_device)

    queue.publish_message(
        topic_arn=device_registered_topic,
        message=json.dumps({"deviceName": created_device['deviceName']})
    )
    logger.info('## MESSAGE PUBLISHED TO TOPIC')
    logger.info(device_registered_topic)

    return created_device
