from boto3.dynamodb.conditions import Key

class MessagesDataSource:

    def __init__(self, resource, table_name):
        self.table = self.construct_table_handle(resource, table_name)

    def construct_table_handle(self, resource, table_name):
        return resource.Table(table_name)

    def get_device_messages(self, device_name, timestamp, messages_limit=1):
        query = self.table.query(
            Limit=messages_limit,
            ScanIndexForward=False,
            KeyConditionExpression=
                Key("deviceName").eq(device_name) & Key("timestamp").gte(timestamp)
        )

        return query['Items']
