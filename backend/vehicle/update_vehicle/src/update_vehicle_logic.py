import logging

from shared.vehicle_exceptions import VehicleNotFound
from shared.date_to_string_parser import parse_date_to_string

logger = logging.getLogger()
logger.setLevel(logging.INFO)


def update_vehicle_logic(data, storage):
    update_query = "update vehicles set numberPlate=%s, brand=%s, model=%s, deviceId=%s, inspectionDate=%s, insuranceDate=%s where vehicleId=%s"
    storage.execute(update_query, data)
    select_query = "select * from vehicles where vehicleId=%s"
    vehicle_id = data[6]
    params = (vehicle_id,)
    select_result = storage.select(select_query, params)
    vehicle = select_result[0]
    vehicle["inspectionDate"] = parse_date_to_string(vehicle["inspectionDate"], "%Y-%m-%d")
    vehicle["insuranceDate"] = parse_date_to_string(vehicle["insuranceDate"], "%Y-%m-%d")
    logger.info(vehicle)
    if vehicle:
        return vehicle
    else:
        raise VehicleNotFound
