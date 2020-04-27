from DbClient import DbClient
from update_vehicle_logic import update_vehicle_logic
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


def update_vehicle(event, context):
    logger.info(event)
    params = {
        "reg_plate": event['reg_plate'],
        "brand": event['brand'],
        "model": event['model'],
        "vehicle_id": event['id']
    }
    return update_vehicle_logic(params, db_client)



