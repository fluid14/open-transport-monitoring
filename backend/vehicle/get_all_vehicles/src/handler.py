import logging
import os

from SqlClient import SqlClient
from get_all_vehicles_logic import get_all_vehicles_logic

logger = logging.getLogger()
logger.setLevel(logging.INFO)

db_client = SqlClient(os.environ['DB_NAME'],
                      os.environ['USERNAME'],
                      os.environ['PASSWORD'],
                      os.environ['HOSTNAME'],
                      os.environ['PORT'])
db_client.connect()


def get_all_vehicles(event, context):
    return get_all_vehicles_logic(db_client)
