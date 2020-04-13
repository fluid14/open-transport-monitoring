import boto3
import os
import logging
import QueueHelper as Queue

from DeviceCertificatesCreator import DeviceCertificatesCreator

# Environment variables
policy_name = os.environ['IOT_POLICY']
topic_arn = os.environ['IOT_DEVICE_CERTIFICATES_CREATED_TOPIC']

# AWS services client
sns_client = boto3.client('sns')
iot_client = boto3.client('iot')

# Logger setup
logger = logging.getLogger()
logger.setLevel(logging.INFO)

# Core classes
queue_helper = Queue.QueueHelper(sns_client=sns_client)
device_certificates = DeviceCertificatesCreator(iot_client=iot_client)


def create_device_certificates(event, context):
    logger.info('## RECEIVED EVENT')
    logger.info(event)

    # Retrieve thing name from incoming message
    device_name = queue_helper.decode_message(event=event)['deviceName']
    logger.info('## DEVICE NAME')
    logger.info(device_name)

    # Create certificates and attach policies to thing
    certificates = device_certificates.prepare_device_certificates(
        device_name=device_name,
        policy_name=policy_name
    )
    logger.info('## GENERATED CERTIFICATES FOR POLICY')
    logger.info(policy_name)

    # Publish created certificates
    queue_helper.publish_message(
        topic_arn=topic_arn,
        message=certificates
    )
    logger.info('## MESSAGE PUBLISHED TO TOPIC')
    logger.info(topic_arn)

    return certificates
