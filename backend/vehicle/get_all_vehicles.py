from DbClient import DbClient
import logging
import os

logger = logging.getLogger()
logger.setLevel(logging.INFO)

db_client = DbClient(os.environ['DB_NAME'],
                     os.environ['USERNAME'],
                     os.environ['PASSWORD'],
                     os.environ['HOSTNAME'],
                     os.environ['PORT'])
connection = db_client.connect()


def lambda_handler(event, context):
    query = "select * from vehicles"
    params = None
    result = db_client.select(query, params)
    logger.info(result)

    if result:
        return result
    else:
        raise Exception("Error while reading vehicles")
