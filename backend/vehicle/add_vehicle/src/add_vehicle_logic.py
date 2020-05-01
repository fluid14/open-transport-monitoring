import logging

from shared.vehicle_exceptions import VehicleNotCreated

logger = logging.getLogger()
logger.setLevel(logging.INFO)


def add_vehicle_logic(data, storage):
    query = "insert into vehicles (NumberPlate, Brand, Model, DeviceID) values (%s, %s, %s, %s)"
    result = storage.execute(query, data)
    logger.info(result)

    if result:
        storage.connect()
        params = None
        query = "SELECT * FROM vehicles WHERE VehicleID = (SELECT max(VehicleID) FROM vehicles)"
        result = storage.select(query, params)
        return result
    else:
        raise VehicleNotCreated
