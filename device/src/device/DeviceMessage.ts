import VehicleErrors from '../simulator/errors/VehicleErrors';

interface DeviceMessage {
  speed: number;
  rpm: number;
  oilTemperature: number;
  oilPressure: number;
  fuelLevel: number;
  fuelConsumption: number;
  fuelRange: number;
  tyresPressure: number[];
  mileage: number;
  rideTime: number;
  position: [number, number];
  errors: VehicleErrors;
}

export default DeviceMessage;
