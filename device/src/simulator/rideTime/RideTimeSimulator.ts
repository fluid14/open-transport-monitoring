import Simulator from '../Simulator';
import SimulatorTypes from '../SimulatorTypes';

const RIDE_TIME_INITIAL_VALUE = 0;
const RIDE_TIME_STEP = 2;

class RideTimeSimulator implements Simulator<number> {

  public readonly type = SimulatorTypes.RIDE_TIME;
  private lastValue: number = RIDE_TIME_INITIAL_VALUE;

  public getNextValue(): number {
    this.lastValue = this.generateValue();
    return this.lastValue;
  }

  private generateValue(): number {
    return this.lastValue + RIDE_TIME_STEP;
  }

}

export default RideTimeSimulator;
