import boto3
import os

def put_s3_object(fileContent, fileName):
    s3 = boto3.client('s3')
    response = s3.put_object(
        Body=fileContent, 
        Bucket=os.environ['IOT_DEVICES_CERTS_BUCKET'], 
        Key=fileName
    )
    return response
