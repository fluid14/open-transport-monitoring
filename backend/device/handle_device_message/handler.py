import os
from graphql_client import GraphqlClient

api_url = os.environ['API_URL']
api_key = os.environ['API_KEY']

def handle_device_message(event, context):
    try:
        device = event['device']
        message = event['message']
    except:
        print("Invalid input")

    client = GraphqlClient(api_url, api_key)
    client.publish_device_message(device, message)
    