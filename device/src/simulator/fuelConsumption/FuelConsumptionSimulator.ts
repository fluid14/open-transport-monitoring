import { random, floor } from 'lodash';

import Simulator from '../Simulator';
import SimulatorTypes from '../SimulatorTypes';
import IterationHandler from '../IterationHandler';

const FUEL_CONSUMPTION_INITIAL_VALUE = 30;
const FUEL_CONSUMPTION_MAX_VALUE = 55;
const FUEL_CONSUMPTION_MIN_VALUE = 20;
const FUEL_CONSUMPTION_RANGE = 0.1;
const INTERVAL = 5;

class FuelConsumptionSimulator implements Simulator<number> {

  public readonly type = SimulatorTypes.FUEL_CONSUMPTION;
  private iterationHandler = new IterationHandler(INTERVAL, () => this.setNewValue());
  private lastValue: number = FUEL_CONSUMPTION_INITIAL_VALUE;

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
    const currentConsumption = this.lastValue;
    const newConsumption = random(
      currentConsumption - FUEL_CONSUMPTION_RANGE,
      currentConsumption + FUEL_CONSUMPTION_RANGE
    );

    if (newConsumption > FUEL_CONSUMPTION_MAX_VALUE) {
      return FUEL_CONSUMPTION_MAX_VALUE;
    }

    if (newConsumption < FUEL_CONSUMPTION_MIN_VALUE) {
      return FUEL_CONSUMPTION_MIN_VALUE;
    }

    return floor(newConsumption, 2);
  }

}

export default FuelConsumptionSimulator;
