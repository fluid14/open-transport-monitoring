import requests
import os
import logging
import json
import re

from device_message_mutation_builder import build_device_message_mutation
# Environment variables
api_url = os.environ['API_URL']
api_key = os.environ['API_KEY']

# Logger setup
logger = logging.getLogger()
logger.setLevel(logging.INFO)


def device_message(event, context):

    logger.info("## EVENT RECEIVED")
    logger.info(event)

    query = build_device_message_mutation(event)
    payload = {"query": query}

    logger.info("## REQUEST PAYLOAD")
    logger.info(payload)

    headers = {
        'Content-Type': 'application/json',
        'X-Api-Key': api_key
    }
    requests.post(api_url, headers=headers, json=payload)
