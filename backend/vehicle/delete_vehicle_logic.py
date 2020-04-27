from vehicle_errors import ResourceNotFoundException
import logging

logger = logging.getLogger()
logger.setLevel(logging.INFO)


def delete_vehicle_logic(data, storage):
    query = "delete from vehicles where id=%s"
    params = (data,)
    result = storage.execute(query, params)
    logger.info(result)

    if result:
        return True
    else:
        raise ResourceNotFoundException
