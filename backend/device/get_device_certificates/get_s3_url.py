import boto3
import os

def get_s3_url(fileName):
    s3 = boto3.client('s3')
    bucket = os.environ['IOT_DEVICES_CERTS_BUCKET']
    
    try:
        object = s3.get_object(Bucket=bucket, Key=fileName)
        presigned_url = s3.generate_presigned_url(
            'get_object', 
            Params={
               'Bucket': bucket,
               'Key': fileName
            },
            ExpiresIn=60
        )
        return presigned_url
    except:
        raise Exception('File does not exits')
