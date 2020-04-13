import requests


class GraphqlClient:
    def __init__(self, api_url, api_key):
        self.api_url = api_url
        self.post_headers = {
            'Content-Type': 'application/json',
            'X-Api-Key': api_key
        }

    def publish_device_message(self, device, message):
        test_data = str(message['test_data'])
        payload = {
            "query": "mutation {\n  publishDeviceMessage(device: \"" + device +
            "\", message: {test_data: " + test_data +
            "}) {\n    test_data\n    device\n   }\n}\n"
        }

        requests.post(
            self.api_url,
            headers=self.post_headers,
            json=payload
        )
