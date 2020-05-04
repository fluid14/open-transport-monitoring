import Simulator from '../Simulator';
import SimulatorTypes from '../SimulatorTypes';
import IterationHandler from '../IterationHandler';

const FUEL_RANGE_INITIAL_VALUE = 2000;
const FUEL_RANGE_MODIFICATOR = 0.3;
const ITERATION = 5;

class FuelRangeSimulator implements Simulator<number> {

  public readonly type = SimulatorTypes.FUEL_RANGE;
  private iterationHandler = new IterationHandler(ITERATION, () => this.setNewValue())
  private lastValue: number = FUEL_RANGE_INITIAL_VALUE;

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
    const newFuelRange = this.lastValue - FUEL_RANGE_MODIFICATOR;

    if (newFuelRange < 0) {
      return FUEL_RANGE_INITIAL_VALUE;
    }

    return newFuelRange;
  }

}

export default FuelRangeSimulator;
