import unittest
from ..src.delete_vehicle_logic import delete_vehicle_logic
from ...shared.DatabaseStub import DatabaseStub
from ...shared.vehicle_exceptions import VehicleNotFound


class TestDeleteVehicle(unittest.TestCase):
    def setUp(self):
        self.storage_stub = DatabaseStub()
        self.vehicle_id = "1"

    def test_return_true_if_vehicle_deleted(self):
        self.storage_stub.state = True
        result = delete_vehicle_logic(self.vehicle_id, self.storage_stub)
        self.assertTrue(result)

    def test_error_raised_when_deleting_failed(self):
        self.storage_stub.state = False
        self.assertRaises(VehicleNotFound, delete_vehicle_logic, self.vehicle_id, self.storage_stub)


if __name__ == '__main__':
    unittest.main()
