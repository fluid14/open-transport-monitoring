import json
import unittest
from unittest.mock import Mock

from QueueHelper import QueueHelper
from queue_errors import InvalidInputException


class TestSnsHelper(unittest.TestCase):
    def setUp(self):
        self.clientMock = Mock()
        self.snsHelper = QueueHelper(self.clientMock)

    def test_message_decode_valid_sns_event(self):
        test_message = {
            "test_property": "test_value"
        }
        event = {
            "Records": [
                {
                    "Sns": {
                        "Message": json.dumps(test_message)
                    }
                }
            ]
        }

        result = self.snsHelper.decode_message(event=event)
        self.assertEqual(result, test_message)

    def test_message_decode_invalid_sns_event(self):
        event = {
            "some-other-property": []
        }

        with self.assertRaises(InvalidInputException):
            self.snsHelper.decode_message(event)

    def test_publish_sns_message(self):
        test_arn = 'testArn'
        test_message = {
            "test_property": "test_value"
        }

        self.snsHelper.publish_message(
            topic_arn=test_arn,
            message=test_message
        )
        self.clientMock.publish.assert_called_once_with(
            Message=json.dumps(test_message),
            TopicArn=test_arn
        )


if __name__ == '__main__':
    unittest.main(verbosity=2)
