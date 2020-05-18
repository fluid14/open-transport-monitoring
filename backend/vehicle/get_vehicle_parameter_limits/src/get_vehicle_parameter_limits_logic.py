import logging

from shared.vehicle_exceptions import VehicleParameterLimitsNotFound

logger = logging.getLogger()
logger.setLevel(logging.INFO)


def get_vehicle_parameter_limits_logic(storage):
    query = "SELECT name, min, max, unit FROM parameterLimits"
    params = None
    result = storage.select(query, params)

    logger.info(result)
    if result:
        return result
    else:
        raise VehicleParameterLimitsNotFound
