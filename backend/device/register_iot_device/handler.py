import json
import os
import boto3

def register_iot_device(event, context):
    iot = boto3.client('iot')
    sns = boto3.client('sns')
    
    thingName = event['name']
    
    thing = iot.create_thing(thingName = thingName)
    
    sns.publish(
        TopicArn=os.environ['IOT_DEVICE_REGISTERED_TOPIC'],
        Message=json.dumps({"thingName": thingName })
    )
    
    return {
        "name": thing['thingName'],
        "arn": thing['thingArn']
    }
