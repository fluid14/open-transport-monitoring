import unittest
from get_all_vehicles_logic import get_all_vehicles_logic
from DatabaseStub import DatabaseStub
from vehicle_exceptions import VehicleNotFound


class TestGetAllVehicles(unittest.TestCase):
    def setUp(self):
        self.storage_stub = DatabaseStub()

    def test_get_vehicles_list(self):
        self.storage_stub.data = True
        result = get_all_vehicles_logic(self.storage_stub)
        self.assertTrue(result)

    def test_exception_raised_when_no_vehicles_fetched(self):
        self.storage_stub.data = None
        self.assertRaises(VehicleNotFound, get_all_vehicles_logic, self.storage_stub)


if __name__ == '__main__':
    unittest.main()
