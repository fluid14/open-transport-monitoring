from DbClient import DbClient
import logging

logger = logging.getLogger()
logger.setLevel(logging.INFO)

db_client = DbClient()
connection = db_client.connect()


def lambda_handler(event, context):
    query = "select * from vehicles"
    params = None
    result = db_client.select(query, params)
    logger.info(result)

    if result:
        return {
            'body': result
        }
    else:
        raise Exception("Error while reading vehicles")
