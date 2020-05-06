import unittest
from ..src.add_vehicle_logic import add_vehicle_logic
from ...shared.DatabaseStub import DatabaseStub
from ...shared.vehicle_exceptions import VehicleNotCreated


class TestAddVehicle(unittest.TestCase):
    def setUp(self):
        self.storage_stub = DatabaseStub()
        plate_number = "POZ997788"
        brand = "MERCEDES"
        model = "DAILY"
        device_id = "ID987654"
        self.dummy_params = (plate_number, brand, model, device_id)

    def test_vehicle_added_and_returned(self):
        self.storage_stub.state = True
        result = add_vehicle_logic(self.dummy_params, self.storage_stub)
        self.assertTrue(result)

    def test_error_raised_vehicle_not_added(self):
        self.storage_stub.state = False
        self.assertRaises(VehicleNotCreated, add_vehicle_logic, self.dummy_params, self.storage_stub)


if __name__ == '__main__':
    unittest.main()
