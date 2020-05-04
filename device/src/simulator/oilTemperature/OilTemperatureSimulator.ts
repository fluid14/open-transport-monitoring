import { random } from 'lodash';

import Simulator from '../Simulator';
import SimulatorTypes from '../SimulatorTypes';
import IterationHandler from '../IterationHandler';

const OIL_TEMPERATURE_RANGE = 3;
const OIL_TEMPERATURE_INITIAL_VALUE = 100;
const ITERATIONS = 5;

class OilTemperatureSimulator implements Simulator<number> {

  public readonly type = SimulatorTypes.OIL_TEMPERATURE;
  private iterationHandler = new IterationHandler(ITERATIONS, () => this.setNewValue())
  private lastValue: number = OIL_TEMPERATURE_INITIAL_VALUE;

  public getNextValue(): number {
    this.handleIteration();
    return this.lastValue;
  }

  private handleIteration(): void {
    this.iterationHandler.nextIteration();
  }

  private setNewValue(): void {
    this.lastValue = this.generateValue();
  }


  private generateValue(): number {
      const currentTemperature = this.lastValue;
      const newTemperature = random(
        currentTemperature - OIL_TEMPERATURE_RANGE,
        currentTemperature + OIL_TEMPERATURE_RANGE
      );

      return newTemperature;
  }

}

export default OilTemperatureSimulator;
