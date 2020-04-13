import json
import queue_errors as errors


class QueueHelper:
    def __init__(self, sns_client):
        self.client = sns_client

    @staticmethod
    def decode_message(event):
        try:
            records = event['Records']
            first = records[0]
            sns = first['Sns']
            message = sns['Message']

            return json.loads(message)
        except KeyError:
            raise errors.InvalidInputException

    def publish_message(self, topic_arn, message):
        self.client.publish(
            TopicArn=topic_arn,
            Message=json.dumps(message)
        )
