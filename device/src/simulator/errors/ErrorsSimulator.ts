import { sample } from 'lodash';

import Simulator from '../Simulator';
import SimulatorTypes from '../SimulatorTypes';
import IterationHandler from '../IterationHandler';
import VehicleErrors from './VehicleErrors';

const ERRORS_INITIAL_VALUE = {
  engine: false,
  oilLevel: false,
  coolantTemperature: false,
  battery: false,
  abs: false,
  powerSteering: false
};
const INTERVAL = 150;

class ErrorsSimulator implements Simulator<VehicleErrors> {

  public readonly type = SimulatorTypes.ERRORS;
  private interationHandler = new IterationHandler(INTERVAL, () => this.setNewValue())
  private lastValue: VehicleErrors = ERRORS_INITIAL_VALUE;

  public getNextValue(): VehicleErrors {
    this.handleIteration();
    return this.lastValue;
  }

  private handleIteration(): void {
    this.interationHandler.nextIteration();
  }

  private setNewValue() {
    this.lastValue = this.generateValue();
  }

  private generateValue(): VehicleErrors {
    const errors = Object.keys(ERRORS_INITIAL_VALUE);

    const randomError = sample(errors);

    return {
      ...ERRORS_INITIAL_VALUE,
      [randomError]: true
    };
  }

}

export default ErrorsSimulator;
