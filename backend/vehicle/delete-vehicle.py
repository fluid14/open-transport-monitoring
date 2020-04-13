from DbClient import DbClient
import logging

logger = logging.getLogger()
logger.setLevel(logging.INFO)

db_client = DbClient()
connection = db_client.connect()


def lambda_handler(event, context):
    logger.info(event)
    vehicle_id = event['id']
    query = "delete from vehicles where id=%s"
    params = (vehicle_id,)
    result = db_client.execute(query, params)
    logger.info(result)

    if result:
        return {
            'body': result
        }
    else:
        raise Exception("Error while deleting vehicle")
