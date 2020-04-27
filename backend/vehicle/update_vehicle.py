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


def update_vehicle(event, context):
    logger.info(event)
    params = {
        "reg_plate": event['reg_plate'],
        "brand": event['brand'],
        "model": event['model'],
        "vehicle_id": event['id']
    }
    return update_vehicle_logic(params, db_client)


def update_vehicle_logic(data, storage):
    params = (data["reg_plate"],
              data["brand"],
              data["model"],
              data["vehicle_id"])
    query = "update vehicles set reg_plate=%s,  brand=%s,  model=%s where id=%s"
    result = storage.execute(query, params)
    if result:
        storage.connect()
        query = "select * from vehicles where id=%s"
        vehicle_id = data["vehicle_id"]
        params = (vehicle_id,)
        result = storage.select(query, params)
        return result
    else:
        raise ResourceNotFoundException
