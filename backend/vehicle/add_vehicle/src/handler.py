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
    insurance_date = event['insuranceDate']
    inspection_date = event['inspectionDate']

    params = (number_plate, brand, model, device_id, insurance_date, inspection_date)
    return add_vehicle_logic(params, db_client)


