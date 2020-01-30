import json
from put_s3_object import put_s3_object

def store_device_certificates(event, context):
    payload = json.loads(event['Records'][0]['Sns']['Message']);
   
    thingName = payload['thingName']
    certificates = {
        "certificate": payload['certificatePem'],
        "publicKey": payload['publicKey'],
        "privateKey": payload['privateKey']
    }
    
    try:
        for cert in certificates:
            put_s3_object(certificates[cert], thingName + '/' + cert + '.pem')
        
        return thingName + ' certificates saved'
    except:
        return None
