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


def lambda_handler(event, context):
    logger.info(event)
    reg_plate = event['reg_plate']
    brand = event['brand']
    model = event['model']
    vehicle_id = event['id']
    params = (reg_plate, brand, model, vehicle_id)
    query = "update vehicles set reg_plate=%s,  brand=%s,  model=%s where id=%s"
    result = db_client.execute(query, params)
    logger.info(result)

    if result:
        return result
    else:
        raise ResourceNotFoundException
