import logging

from shared.vehicle_exceptions import VehicleNotFound
from shared.date_to_string_parser import parse_date_to_string

logger = logging.getLogger()
logger.setLevel(logging.INFO)


def get_vehicle_logic(data, storage):
    query = "select * from vehicles where vehicleId=%s"
    params = (data,)
    result = storage.select(query, params)
    vehicle = result[0]
    vehicle["inspectionDate"] = parse_date_to_string(vehicle["inspectionDate"], "%Y-%m-%d")
    vehicle["insuranceDate"] = parse_date_to_string(vehicle["insuranceDate"], "%Y-%m-%d")
    logger.info(vehicle)
    if vehicle:
        return vehicle
    else:
        raise VehicleNotFound
