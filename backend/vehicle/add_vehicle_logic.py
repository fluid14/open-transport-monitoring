from vehicle_errors import ResourceNotFoundException
import logging

logger = logging.getLogger()
logger.setLevel(logging.INFO)


def add_vehicle_logic(data, storage):
    query = "insert into vehicles (reg_plate, brand, model) values (%s, %s, %s)"
    result = storage.execute(query, data)
    logger.info(result)

    if result:
        storage.connect()
        params = None
        query = "SELECT * FROM vehicles WHERE id = (SELECT max(id) FROM vehicles)"
        result = storage.select(query, params)
        return result
    else:
        raise ResourceNotFoundException
