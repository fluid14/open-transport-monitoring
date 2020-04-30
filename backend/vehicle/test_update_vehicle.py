import unittest
from update_vehicle_logic import update_vehicle_logic
from vehicle_errors import ResourceNotFoundException
from DatabaseStub import DatabaseStub


class MyTestCase(unittest.TestCase):
    def setUp(self):
        self.storage_stub = DatabaseStub()

    def test_get_updated_vehicle_data(self):
        dummy_params = (1, 2, 3, 4)
        result = update_vehicle_logic(dummy_params, self.storage_stub)
        self.assertTrue(result, dummy_params)

    def test_error_raised_when_update_failed(self):
        dummy_params = None
        self.assertRaises(ResourceNotFoundException, update_vehicle_logic, dummy_params, self.storage_stub)


if __name__ == '__main__':
    unittest.main()
