from botocore.exceptions import ClientError


class FileNotFoundException(Exception): pass
class PresignedUrlException(Exception): pass
class PutObjectException(Exception): pass


class Bucket:
    def __init__(self, s3_client):
        self.client = s3_client

    def check_if_file_exists(self, bucket, file_name):
        try:
            self.client.head_object(Bucket=bucket, Key=file_name)
            return True
        except ClientError as e:
            print(e)
            return False

    def get_presigned_file_url(self, bucket, file_name, expires_in=60):
        try:
            file_exists = self.check_if_file_exists(bucket, file_name)
            if not file_exists:
                raise FileNotFoundException

            presigned_url = self.client.generate_presigned_url(
                'get_object',
                Params={
                    'Bucket': bucket,
                    'Key': file_name
                },
                ExpiresIn=expires_in
            )
            return presigned_url
        except ClientError as e:
            print(e)
            raise PresignedUrlException

    def put_object(self, bucket, content, file_name):
        try:
            put_object_response = self.client.put_object(
                Body=content,
                Bucket=bucket,
                Key=file_name
            )
            return put_object_response
        except ClientError as e:
            print(e)
            raise PutObjectException
