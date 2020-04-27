from vehicle_errors import ResourceNotFoundException
import logging

logger = logging.getLogger()
logger.setLevel(logging.INFO)


def get_all_vehicles_logic(data, storage):
    query = "select * from vehicles"
    result = storage.select(query, data)
    logger.info(result)

    if result:
        return result
    else:
        raise ResourceNotFoundException
