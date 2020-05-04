import { random } from 'lodash';

import Simulator from '../Simulator';
import SimulatorTypes from '../SimulatorTypes';

const SPEED_RANGE = 5
const SPEED_INITIAL_VALUE = 50;
const SPEED_MIN_VALUE = 35;
const SPEED_MAX_VALUE = 80;

class SpeedSimulator implements Simulator<number> {

  public readonly type = SimulatorTypes.SPEED;
  private lastValue: number = SPEED_INITIAL_VALUE;

  public getNextValue(): number {
    this.lastValue = this.generateSpeed();
    return this.lastValue;
  }

  private generateSpeed(): number {
    const currentSpeed = this.lastValue;
    const newSpeed = random(
      currentSpeed - SPEED_RANGE,
      currentSpeed + SPEED_RANGE
    );

    if (newSpeed > SPEED_MAX_VALUE) {
      return SPEED_MAX_VALUE;
    }

    if (newSpeed < SPEED_MIN_VALUE) {
      return SPEED_MIN_VALUE;
    }

    return newSpeed;
  }

}

export default SpeedSimulator;
