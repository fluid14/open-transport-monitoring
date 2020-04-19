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
    logger.info(event)
    vehicle_id = event['id']
    query = "select * from vehicles where id=%s"
    params = (vehicle_id,)
    result = db_client.execute(query, params)
    logger.info(result)

    if result:
        return result
    else:
        raise Exception("Error while reading vehicle")
