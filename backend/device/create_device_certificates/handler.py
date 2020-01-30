import json
import boto3
import os

def create_device_certificates(event, context):
    iot = boto3.client('iot')
    sns = boto3.client('sns')
    
    thingName = json.loads(event['Records'][0]['Sns']['Message'])['thingName'];

    certificates = iot.create_keys_and_certificate(setAsActive=True)
    
    iot.attach_policy(
        policyName = os.environ['IOT_POLICY'],
        target = certificates['certificateArn']    
    )
    
    iot.attach_thing_principal(
        thingName = thingName,
        principal = certificates['certificateArn']
    )
    
    thingCertificates = {
        "thingName": thingName,
        "certificatePem": certificates['certificatePem'],
        "publicKey": certificates['keyPair']['PublicKey'],
        "privateKey": certificates['keyPair']['PrivateKey']
    }
   
    sns.publish(
        TopicArn=os.environ['IOT_DEVICE_CERTIFICATES_CREATED_TOPIC'],
        Message=json.dumps(thingCertificates)
    )
    
    return thingCertificates