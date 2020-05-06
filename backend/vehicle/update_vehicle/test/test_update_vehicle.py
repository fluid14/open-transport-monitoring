import unittest
from ..src.update_vehicle_logic import update_vehicle_logic
from ...shared.DatabaseStub import DatabaseStub
from ...shared.vehicle_exceptions import VehicleNotFound


class TestUpdateVehicle(unittest.TestCase):
    def setUp(self):
        self.storage_stub = DatabaseStub()
        plate_number = "POZ997788"
        brand = "MERCEDES"
        model = "DAILY"
        device_id = "ID987654"
        vehicle_id = "ID987654"
        self.dummy_params = (plate_number, brand, model, device_id, vehicle_id)

    def test_get_updated_vehicle_data(self):
        self.storage_stub.state = True
        result = update_vehicle_logic(self.dummy_params, self.storage_stub)
        self.assertTrue(result)

    def test_error_raised_when_update_failed(self):
        self.storage_stub.state = False
        self.assertRaises(VehicleNotFound, update_vehicle_logic, self.dummy_params, self.storage_stub)


if __name__ == '__main__':
    unittest.main()
