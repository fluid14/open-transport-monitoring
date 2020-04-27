from vehicle_errors import ResourceNotFoundException
import logging

logger = logging.getLogger()
logger.setLevel(logging.INFO)


def update_vehicle_logic(data, storage):
    params = (data["reg_plate"],
              data["brand"],
              data["model"],
              data["vehicle_id"])
    query = "update vehicles set reg_plate=%s,  brand=%s,  model=%s where id=%s"
    result = storage.execute(query, params)
    if result:
        storage.connect()
        query = "select * from vehicles where id=%s"
        vehicle_id = data["vehicle_id"]
        params = (vehicle_id,)
        result = storage.select(query, params)
        return result
    else:
        raise ResourceNotFoundException
