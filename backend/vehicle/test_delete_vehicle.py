import unittest
from delete_vehicle_logic import delete_vehicle_logic
from vehicle_errors import ResourceNotFoundException
from DatabaseStub import DatabaseStub


class TestDeleteVehicle(unittest.TestCase):
    def setUp(self):
        self.storage_stub = DatabaseStub()

    def test_return_true_if_vehicle_deleted(self):
        dummy_params = 1
        result = delete_vehicle_logic(dummy_params, self.storage_stub)
        self.assertTrue(result)

    def test_error_raised_when_deleting_failed(self):
        dummy_params = None
        self.assertRaises(ResourceNotFoundException, delete_vehicle_logic, dummy_params, self.storage_stub)


if __name__ == '__main__':
    unittest.main()
