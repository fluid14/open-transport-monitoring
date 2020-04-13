import os
import boto3
import logging

from QueueHelper import QueueHelper
from Bucket import Bucket, PutObjectException
from DeviceCertificateStorage import DeviceCertificateStorage
from store_device_certificates_errors import StorageFailed

# Environment variables
bucket_name = os.environ['IOT_DEVICES_CERTS_BUCKET']

# AWS services clients
s3_client = boto3.client('s3')
sns_client = boto3.client('sns')

# Logger setup
logger = logging.getLogger()
logger.setLevel(logging.INFO)

# Core classes
bucket = Bucket(s3_client=s3_client)
queue = QueueHelper(sns_client=sns_client)
certificates_storage = DeviceCertificateStorage(bucket=bucket)


def store_device_certificates(event, context):
    logger.info('## EVENT RECEIVED')
    logger.info(event)

    certificates = queue.decode_message(event=event)

    try:
        certificates_storage.store_certificates(certificates, bucket_name)
        logger.info('## CERTIFICATES STORED SUCCESSFULY')
        logger.info(certificates)

        return '{} certificates stored sucessfuly'.format(certificates['deviceName'])
    except PutObjectException as e:
        logger.error('## ERROR WHEN STORRING CERTIFICATES')
        logger.error(e)

        raise StorageFailed
