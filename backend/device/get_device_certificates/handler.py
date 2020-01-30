import boto3
import json
from get_s3_url import get_s3_url

def get_device_certificates(event, context):
    iot = boto3.client('iot')

    thingName = event['name']
    fileNames = [
        thingName + '/certificate.pem',
        thingName + '/privateKey.pem',
        'rootCa.pem'
    ]

    try:
        thing = iot.describe_thing(thingName=thingName)
        urls = map(lambda fileName: get_s3_url(fileName), fileNames)
            
        return {
            'urls': list(urls)
        }
    except:
        raise Exception("Device not found") 
