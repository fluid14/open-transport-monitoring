import logging
import os

from SqlClient import SqlClient
from add_vehicle_logic import add_vehicle_logic

logger = logging.getLogger()
logger.setLevel(logging.INFO)

db_client = SqlClient(os.environ['DB_NAME'],
                      os.environ['USERNAME'],
                      os.environ['PASSWORD'],
                      os.environ['HOSTNAME'],
                      os.environ['PORT'])
db_client.connect()


def add_vehicle(event, context):
    logger.info(event)
    number_plate = event['numberPlate']
    brand = event['brand']
    model = event['model']
    device_id = event['deviceId']

    params = (number_plate, brand, model, device_id)
    return add_vehicle_logic(params, db_client)


