import logging

from ...shared.vehicle_exceptions import VehicleNotFound

logger = logging.getLogger()
logger.setLevel(logging.INFO)


def delete_vehicle_logic(data, storage):
    query = "delete from vehicles where VehicleID=%s"
    params = (data,)
    result = storage.execute(query, params)
    logger.info(result)

    if result:
        return True
    else:
        raise VehicleNotFound
