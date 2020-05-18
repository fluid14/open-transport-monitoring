import logging
import os

from SqlClient import SqlClient
from get_vehicle_parameter_limits_logic import get_vehicle_parameter_limits_logic

logger = logging.getLogger()
logger.setLevel(logging.INFO)

db_client = SqlClient(os.environ['DB_NAME'],
                      os.environ['USERNAME'],
                      os.environ['PASSWORD'],
                      os.environ['HOSTNAME'],
                      os.environ['PORT'])
connection = db_client.connect()


def get_vehicle_parameter_limits(event, context):
    return get_vehicle_parameter_limits_logic(db_client)
