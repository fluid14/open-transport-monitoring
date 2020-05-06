import unittest
from ..src.get_vehicle_logic import get_vehicle_logic
from ...shared.DatabaseStub import DatabaseStub
from ...shared.vehicle_exceptions import VehicleNotFound


class TestGetVehicle(unittest.TestCase):
    def setUp(self):
        self.storage_stub = DatabaseStub()
        self.vehicle_id = "2"

    def test_get_vehicle(self):
        self.storage_stub.state = (True,)
        result = get_vehicle_logic(self.vehicle_id, self.storage_stub)
        self.assertTrue(result)

    def test_error_raised_when_no_vehicle_fetched(self):
        self.storage_stub.state = (False,)
        self.assertRaises(VehicleNotFound, get_vehicle_logic, self.vehicle_id, self.storage_stub)


if __name__ == '__main__':
    unittest.main()
