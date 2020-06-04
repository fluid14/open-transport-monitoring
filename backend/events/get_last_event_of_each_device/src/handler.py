import boto3
import os

from Device import Device
from Time import Time
from MessagesDataSource import MessagesDataSource
from get_last_event_of_each_device import get_last_event_of_each_device

# Environment variables
messages_table = os.environ['MESSAGES_TABLE']

# AWS services clients
iot_client = boto3.client('iot')
dynamodb_client = boto3.resource('dynamodb')

# Core classes
device = Device(iot_client=iot_client)
message_data_source = MessagesDataSource(resource=dynamodb_client, table_name=messages_table)
time = Time()

def handler(event, context):
    return get_last_event_of_each_device(
        device=device,
        time=time,
        data_source=message_data_source
    )
