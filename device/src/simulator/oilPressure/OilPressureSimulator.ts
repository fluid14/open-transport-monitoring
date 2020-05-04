import { random, floor } from 'lodash';

import Simulator from '../Simulator';
import SimulatorTypes from '../SimulatorTypes';
import IterationHandler from '../IterationHandler';

const OIL_PRESSURE_INITIAL_VALUE = 0.3;
const OIL_PRESSURE_MAX_VALUE = 0.6;
const OIL_PRESSURE_MIN_VALUE = 0.2;
const OIL_PRESSURE_RANGE = 0.1;
const ITERATION = 10;

class OilPressureSimulator implements Simulator<number> {

  public readonly type = SimulatorTypes.OIL_PRESSURE;
  private iterationHandler = new IterationHandler(ITERATION, () => this.setNewValue())
  private lastValue: number = OIL_PRESSURE_INITIAL_VALUE;

  public getNextValue(): number {
    this.handleIteration()
    return this.lastValue;
  }

  private handleIteration(): void {
    this.iterationHandler.nextIteration();
  }

  private setNewValue(): void {
    this.lastValue = this.generateValue();
  }


  private generateValue(): number {
    const currentPressure = this.lastValue;
    const newPressure = random(
      currentPressure - OIL_PRESSURE_RANGE,
      currentPressure + OIL_PRESSURE_RANGE
    );

    if (newPressure > OIL_PRESSURE_MAX_VALUE) {
      return OIL_PRESSURE_MAX_VALUE;
    }

    if (newPressure < OIL_PRESSURE_MIN_VALUE) {
      return OIL_PRESSURE_MIN_VALUE;
    }

    return floor(newPressure, 2);
  }

}

export default OilPressureSimulator;
