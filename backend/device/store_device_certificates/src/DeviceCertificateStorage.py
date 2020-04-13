class DeviceCertificateStorage:
    def __init__(self, bucket):
        self.bucket = bucket

    def store_certificates(self, certificates_payload, bucket_name):
        device_name = certificates_payload['deviceName']
        certificates = {
            "certificate": certificates_payload['certificatePem'],
            "publicKey": certificates_payload['publicKey'],
            "privateKey": certificates_payload['privateKey']
        }

        for certificate_key in certificates:
            certificate_content = certificates[certificate_key]
            file_name = '{}/{}.pem'.format(device_name, certificate_key)

            self.bucket.put_object(bucket=bucket_name, content=certificate_content, file_name=file_name)
