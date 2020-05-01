import logging

from shared.vehicle_exceptions import VehicleNotFound

logger = logging.getLogger()
logger.setLevel(logging.INFO)


def update_vehicle_logic(data, storage):
    query = "update vehicles set NumberPlate=%s, Brand=%s, Model=%s, DeviceID=%s where VehicleID=%s"
    result = storage.execute(query, data)
    if result:
        storage.connect()
        query = "select * from vehicles where VehicleID=%s"
        vehicle_id = data[3]
        params = (vehicle_id,)
        result = storage.select(query, params)
        return result
    else:
        raise VehicleNotFound
