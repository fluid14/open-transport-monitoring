from get_device_certificates_errors import DeviceNotFoundException
from Bucket import FileNotFoundException

DEVICE_CERTIFICATE = 'certificate.pem'
PRIVATE_KEY = 'privateKey.pem'
ROOT_CERTIFICATE = 'rootCa.pem'


class DeviceCertificatesGetter:
    def __init__(self, device, bucket):
        self.device = device
        self.bucket = bucket

    def get_certificates_download_urls(self, device_name, bucket_name):
        certificate_file_paths = [
            ROOT_CERTIFICATE,
            device_name + '/' + DEVICE_CERTIFICATE,
            device_name + '/' + PRIVATE_KEY,
        ]

        try:
            urls = map(
                lambda file_name: self.bucket.get_presigned_file_url(bucket_name, file_name),
                certificate_file_paths
            )

            return list(urls)
        except FileNotFoundException:
            return None

    def get_device_certificates(self, device_name, bucket_name):
        device_exists = self.device.check_if_exists(device_name)

        if device_exists:
            download_urls = self.get_certificates_download_urls(device_name, bucket_name)
            return download_urls
        else:
            raise DeviceNotFoundException
