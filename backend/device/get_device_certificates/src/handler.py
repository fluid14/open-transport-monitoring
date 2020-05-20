import os
import boto3
import logging

from Device import Device
from Bucket import Bucket
from DeviceCertificatesGetter import DeviceCertificatesGetter
from get_device_certificates_errors import DeviceNotFoundException

# Environment variables
bucket_name = os.environ['IOT_DEVICES_CERTS_BUCKET']

# AWS services client
iot_client = boto3.client('iot')
s3_client = boto3.client('s3')

# Logger setup
logger = logging.getLogger()
logger.setLevel(logging.INFO)

# Core classes
device = Device(iot_client=iot_client)
bucket = Bucket(s3_client=s3_client)
certificates_getter = DeviceCertificatesGetter(device, bucket)


def get_device_certificates(event, context):
    logger.info('## RECEIVED EVENT')
    logger.info(event)

    # Retreive device name from event object
    device_name = event['deviceName']
    logger.info('## DEVICE NAME')
    logger.info(device_name)

    try:
        # Get device certificates links
        device_certificates = certificates_getter.get_device_certificates(device_name, bucket_name)
        logger.info('## DEVICE CERTIFICATES')
        logger.info(device_certificates)

        return device_certificates
    except DeviceNotFoundException:
        return None
