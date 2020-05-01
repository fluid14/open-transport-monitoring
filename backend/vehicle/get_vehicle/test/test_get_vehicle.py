import unittest
from get_vehicle_logic import get_vehicle_logic
from DatabaseStub import DatabaseStub
from vehicle_exceptions import VehicleNotFound


class TestGetVehicle(unittest.TestCase):
    def setUp(self):
        self.storage_stub = DatabaseStub()

    def test_get_vehicle(self):
        dummy_params = 2
        result = get_vehicle_logic(dummy_params, self.storage_stub)
        self.assertEqual(dummy_params, result)

    def test_error_raised_when_no_vehicle_fetched(self):
        dummy_params = None
        self.assertRaises(VehicleNotFound, get_vehicle_logic, dummy_params, self.storage_stub)


if __name__ == '__main__':
    unittest.main()
