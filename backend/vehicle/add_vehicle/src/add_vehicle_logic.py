import logging

from ...shared.vehicle_exceptions import VehicleNotCreated

logger = logging.getLogger()
logger.setLevel(logging.INFO)


def add_vehicle_logic(data, storage):
    query = "insert into vehicles (NumberPlate, Brand, Model, DeviceID, InspectionDate, InsuranceDate) values (%s, %s, %s, %s, %s, %s)"
    result = storage.execute(query, data)
    if result:
        storage.connect()
        params = None
        query = "SELECT * FROM vehicles WHERE VehicleID = (SELECT max(VehicleID) FROM vehicles)"
        result = storage.select(query, params)
        vehicle = result[0]
        logger.info(vehicle)
        return vehicle
    else:
        raise VehicleNotCreated
