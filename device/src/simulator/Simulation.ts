import Simulator from './Simulator';
import DeviceMessage from '../device/DeviceMessage';

import SpeedSimulator from './speed/SpeedSimulator';
import OilTemperatureSimulator from './oilTemperature/OilTemperatureSimulator';
import OilPressureSimulator from './oilPressure/OilPressureSimulator';
import FuelLevelSimulator from './fuelLevel/FuelLevelSimulator';
import FuelConsumptionSimulator from './fuelConsumption/FuelConsumptionSimulator';
import RPMSimulator from './rpm/RPMSimulator';
import FuelRangeSimulator from './fuelRange/FuelRangeSimulator';
import MileageSimulator from './mileage/MileageSimulator';
import RideTimeSimulator from './rideTime/RideTimeSimulator';
import PositionSimulator from './position/PositionSimulator';
import TyresPressureSimulator from './tyresPressure/TyresPressureSimulator';
import ErrorsSimulator from './errors/ErrorsSimulator';

const SIMULATION_INTERVAL = 2000;

class Simulation {

  private simulators: Simulator<{}>[];
  private intervalId: NodeJS.Timeout;

  constructor() {
    this.simulators = [
      new SpeedSimulator(),
      new RPMSimulator(),
      new OilTemperatureSimulator(),
      new OilPressureSimulator(),
      new FuelLevelSimulator(),
      new FuelConsumptionSimulator(),
      new FuelRangeSimulator(),
      new TyresPressureSimulator(),
      new MileageSimulator(),
      new RideTimeSimulator(),
      new PositionSimulator(),
      new ErrorsSimulator()
    ]
  }

  public start(iterationCallback: Function): void {
    this.intervalId = setInterval(() => {

      const message = this.generateMessage();
      iterationCallback(message);

    }, SIMULATION_INTERVAL);
  }

  public stop(): void {
    clearInterval(this.intervalId);
  }

  private generateMessage(): Partial<DeviceMessage> {
      const message = this.simulators.reduce(
        (msg: Partial<DeviceMessage>, simulator: Simulator<{}>) =>
          ({ ...msg, [simulator.type]: simulator.getNextValue() }),
        {}
      );

      return message;
  }

}

export default Simulation;
