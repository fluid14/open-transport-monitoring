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


def add_vehicle(event, context):
    logger.info(event)
    reg_plate = event['reg_plate']
    brand = event['brand']
    model = event['model']
    params = (reg_plate, brand, model)
    return add_vehicle_logic(params, db_client)


def add_vehicle_logic(data, storage):
    query = "insert into vehicles (reg_plate, brand, model) values (%s, %s, %s)"
    result = storage.execute(query, data)
    logger.info(result)

    if result:
        storage.connect()
        params = None
        query = "SELECT * FROM vehicles WHERE id = (SELECT max(id) FROM vehicles)"
        result = storage.select(query, params)
        return result
    else:
        raise ResourceNotFoundException
