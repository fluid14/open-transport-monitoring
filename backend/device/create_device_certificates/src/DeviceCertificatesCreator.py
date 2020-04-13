from botocore.exceptions import ClientError
from device_certificates_errors import AttachingPolicesException, CreatingCertificatesException


class DeviceCertificatesCreator:
    def __init__(self, iot_client):
        self.client = iot_client

    def prepare_device_certificates(self, device_name, policy_name):
        certificates = self.create_certificates()

        self.attach_policies(
            device_name=device_name,
            policy_name=policy_name,
            certificate_arn=certificates['certificateArn']
        )

        return {
            "deviceName": device_name,
            "certificatePem": certificates['certificatePem'],
            "publicKey": certificates['keyPair']['PublicKey'],
            "privateKey": certificates['keyPair']['PrivateKey']
        }

    def create_certificates(self):
        try:
            certificates = self.client.create_keys_and_certificate(setAsActive=True)
            return certificates
        except ClientError:
            raise CreatingCertificatesException

    def attach_policies(self, device_name, policy_name, certificate_arn):
        try:
            self.client.attach_policy(
                policyName=policy_name,
                target=certificate_arn
            )
            self.client.attach_thing_principal(
                thingName=device_name,
                principal=certificate_arn
            )
        except ClientError:
            raise AttachingPolicesException
