import VehicleErrors from '../simulator/errors/VehicleErrors';

interface DeviceMessage {
  speed: number;
  rpm: number;
  oil_temperature: number;
  oil_pressure: number;
  fuel_level: number;
  fuel_consumption: number;
  fuel_range: number;
  tyres_pressure: number[];
  mileage: number;
  ride_time: number;
  position: [number, number];
  errors: VehicleErrors;
}

export default DeviceMessage;
