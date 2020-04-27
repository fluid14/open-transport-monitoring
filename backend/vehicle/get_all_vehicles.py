from DbClient import DbClient
from get_all_vehicles_logic import get_all_vehicles_logic
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


def get_all_vehicles(event, context):
    params = None
    return get_all_vehicles_logic(params, db_client)
