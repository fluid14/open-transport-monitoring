import logging

from shared.vehicle_exceptions import VehicleNotFound

logger = logging.getLogger()
logger.setLevel(logging.INFO)


def get_vehicle_logic(data, storage):
    query = "select * from vehicles where VehicleID=%s"
    params = (data,)
    result = storage.select(query, params)
    logger.info(result)

    if result:
        return result[0]
    else:
        raise VehicleNotFound
