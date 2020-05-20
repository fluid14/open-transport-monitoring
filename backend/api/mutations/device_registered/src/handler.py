import requests
import os
import boto3
import logging

from QueueHelper import QueueHelper

# Environment variables
api_url = os.environ['API_URL']
api_key = os.environ['API_KEY']

# AWS services clients
sns_client = boto3.client('sns')

# Logger setup
logger = logging.getLogger()
logger.setLevel(logging.INFO)

# Core classes
queue = QueueHelper(sns_client=sns_client)


def device_registered(event, context):

    logger.info("## EVENT RECEIVED")
    logger.info(event)

    device = queue.decode_message(event=event)['deviceName']

    payload = {"query": "mutation { registerDevice(name: \"" + device + "\") { name registered } }"}

    logger.info("## REQUEST PAYLOAD")
    logger.info(payload)

    headers = {
        'Content-Type': 'application/json',
        'X-Api-Key': api_key
    }
    requests.post(api_url, headers=headers, json=payload)
