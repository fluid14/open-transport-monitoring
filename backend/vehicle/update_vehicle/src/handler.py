import logging
import os

from SqlClient import SqlClient
from update_vehicle_logic import update_vehicle_logic

logger = logging.getLogger()
logger.setLevel(logging.INFO)

db_client = SqlClient(os.environ['DB_NAME'],
                      os.environ['USERNAME'],
                      os.environ['PASSWORD'],
                      os.environ['HOSTNAME'],
                      os.environ['PORT'])
db_client.connect()


def update_vehicle(event, context):
    logger.info(event)
    params = (event["numberPlate"],
              event["brand"],
              event["model"],
              event['deviceId'],
              event["inspectionDate"],
              event["insuranceDate"],
              event["vehicleId"])

    return update_vehicle_logic(params, db_client)



