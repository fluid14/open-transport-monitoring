from DbClient import DbClient
from vehicle_errors import ResourceNotFoundException
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


def get_all_vehicles(event, context):
    params = None
    return get_all_vehicles_logic(params, db_client)


def get_all_vehicles_logic(data, storage):
    query = "select * from vehicles"
    result = storage.select(query, data)
    logger.info(result)

    if result:
        return result
    else:
        raise ResourceNotFoundException
