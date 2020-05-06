import logging

from ...shared.vehicle_exceptions import VehicleNotFound

logger = logging.getLogger()
logger.setLevel(logging.INFO)


def get_vehicle_logic(data, storage):
    query = "select * from vehicles where VehicleID=%s"
    params = (data,)
    result = storage.select(query, params)
    vehicle = result[0]
    logger.info(vehicle)
    if vehicle:
        return vehicle
    else:
        raise VehicleNotFound
