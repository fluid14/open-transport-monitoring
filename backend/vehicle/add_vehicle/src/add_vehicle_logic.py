
import logging

from shared.vehicle_exceptions import VehicleNotCreated
from shared.date_to_string_parser import parse_date_to_string

logger = logging.getLogger()
logger.setLevel(logging.INFO)


def add_vehicle_logic(data, storage):
    insert_query = "insert into vehicles (numberPlate, brand, model, deviceId, inspectionDate, insuranceDate) values (%s, %s, %s, %s, %s, %s)"
    result = storage.execute(insert_query, data)
    if result:
        storage.connect()
        params = None
        select_query = "SELECT * FROM vehicles WHERE vehicleId = (SELECT max(vehicleId) FROM vehicles)"
        select_result = storage.select(select_query, params)
        vehicle = select_result[0]
        vehicle["inspectionDate"] = parse_date_to_string(vehicle["inspectionDate"], "%Y-%m-%d")
        vehicle["insuranceDate"] = parse_date_to_string(vehicle["insuranceDate"], "%Y-%m-%d")
        logger.info(vehicle)
        return vehicle
    else:
        raise VehicleNotCreated
