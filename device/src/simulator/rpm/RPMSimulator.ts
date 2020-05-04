import { random } from 'lodash';

import Simulator from '../Simulator';
import SimulatorTypes from '../SimulatorTypes';
import IterationHandler from '../IterationHandler';

const RPM_INITIAL_VALUE = 2000;
const RPM_MAX_VALUE = 3000;
const RPM_MIN_VALUE = 1300;
const RPM_RANGE = 100;
const ITERATION = 30;

class RPMSimulator implements Simulator<number> {

  public readonly type = SimulatorTypes.RPM;
  private iterationHandler = new IterationHandler(ITERATION, () => this.toggleOperationSign())
  private lastValue: number = RPM_INITIAL_VALUE;
  private addToValue: boolean = true;

  public getNextValue(): number {
    this.handleIteration();
    this.lastValue = this.generateValue();
    return this.lastValue;
  }

  private handleIteration(): void {
    this.iterationHandler.nextIteration();
  }

  private toggleOperationSign(): void {
    this.addToValue = !this.addToValue;
  }

  private generateValue(): number {
    const currentRPM = this.lastValue;
    const newRPM = random(
      currentRPM,
      this.addToValue
        ? currentRPM + RPM_RANGE
        : currentRPM - RPM_RANGE
    );

    if (newRPM > RPM_MAX_VALUE) {
      return RPM_MAX_VALUE;
    }

    if (newRPM < RPM_MIN_VALUE) {
      return RPM_MIN_VALUE;
    }

    return newRPM;
  }

}

export default RPMSimulator;
