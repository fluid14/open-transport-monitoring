import unittest
from add_vehicle_logic import add_vehicle_logic
from vehicle_errors import ResourceNotFoundException
from DatabaseStub import DatabaseStub


class TestAddVehicle(unittest.TestCase):
    def setUp(self):
        self.storage_stub = DatabaseStub()

    def test_vehicle_added_and_returned(self):
        dummy_params = ("xxx", "zzz", "yyy")
        result = add_vehicle_logic(dummy_params, self.storage_stub)
        self.assertEqual(dummy_params, result)

    def test_error_raised_vehicle_not_added(self):
        dummy_params = None
        self.assertRaises(ResourceNotFoundException, add_vehicle_logic, dummy_params, self.storage_stub)


if __name__ == '__main__':
    unittest.main()
