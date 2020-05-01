import logging

from shared.vehicle_exceptions import VehicleNotFound

logger = logging.getLogger()
logger.setLevel(logging.INFO)


def update_vehicle_logic(data, storage):
    update_query = "update vehicles set NumberPlate=%s, Brand=%s, Model=%s, DeviceID=%s where VehicleID=%s"
    update_result = storage.execute(update_query, data)
    select_query = "select * from vehicles where VehicleID=%s"
    vehicle_id = data[4]
    params = (vehicle_id,)
    select_result = storage.select(select_query, params)
    if select_result:
        return select_result
    else:
        raise VehicleNotFound
