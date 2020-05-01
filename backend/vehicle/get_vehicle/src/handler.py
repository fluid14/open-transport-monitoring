import logging
import os

from SqlClient import SqlClient
from get_vehicle_logic import get_vehicle_logic

logger = logging.getLogger()
logger.setLevel(logging.INFO)

db_client = SqlClient(os.environ['DB_NAME'],
                      os.environ['USERNAME'],
                      os.environ['PASSWORD'],
                      os.environ['HOSTNAME'],
                      os.environ['PORT'])
connection = db_client.connect()


def get_vehicle(event, context):
    logger.info(event)
    vehicle_id = event['id']

    return get_vehicle_logic(vehicle_id, db_client)
