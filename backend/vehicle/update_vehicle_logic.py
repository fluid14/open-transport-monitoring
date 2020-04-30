from vehicle_errors import ResourceNotFoundException
import logging

logger = logging.getLogger()
logger.setLevel(logging.INFO)


def update_vehicle_logic(data, storage):
    query = "update vehicles set reg_plate=%s,  brand=%s,  model=%s where id=%s"
    result = storage.execute(query, data)
    if result:
        storage.connect()
        query = "select * from vehicles where id=%s"
        vehicle_id = data[3]
        params = (vehicle_id,)
        result = storage.select(query, params)
        return result
    else:
        raise ResourceNotFoundException
