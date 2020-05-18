import logging

from shared.vehicle_exceptions import VehiclesListEmpty
from shared.date_to_string_parser import parse_date_to_string

logger = logging.getLogger()
logger.setLevel(logging.INFO)


def get_all_vehicles_logic(storage):
    query = "select * from vehicles"
    result = storage.select(query, None)
    for row in result:
        row["inspectionDate"] = parse_date_to_string(row["inspectionDate"], "%Y-%m-%d")
        row["insuranceDate"] = parse_date_to_string(row["insuranceDate"], "%Y-%m-%d")
    logger.info(result)

    if result:
        return result
    else:
        raise VehiclesListEmpty
