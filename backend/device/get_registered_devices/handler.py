import json
import boto3

def get_registered_devices(event, context):
    iot = boto3.client('iot')
    
    iot_things = iot.list_things()
    
    devices_map = map(
        lambda thing: {
            'name': thing['thingName'],
            'arn': thing['thingArn']
        }, 
        iot_things['things']
    )
    devices_list = list(devices_map)
    
    return devices_list
