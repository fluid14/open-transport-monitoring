from DbClient import DbClient
from delete_vehicle_logic import delete_vehicle_logic
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


def delete_vehicle(event, context):
    logger.info(event)
    vehicle_id = event['id']
    return delete_vehicle_logic(vehicle_id, db_client)
