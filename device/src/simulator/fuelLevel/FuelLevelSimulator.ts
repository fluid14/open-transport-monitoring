import Simulator from '../Simulator';
import SimulatorTypes from '../SimulatorTypes';
import IterationHandler from '../IterationHandler';

const FUEL_INITIAL_VALUE = 100;
const FUEL_MIN_VALUE = 0;
const FUEL_LEVEL_STEP = 0.5;
const ITERATION = 20;

class FuelLevelSimulator implements Simulator<number> {

  public readonly type = SimulatorTypes.FUEL_LEVEL;
  private lastValue: number = FUEL_INITIAL_VALUE;
  private iterationHandler = new IterationHandler(ITERATION, () => this.setNewValue());

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
    const newLevel = this.lastValue - FUEL_LEVEL_STEP;

    if (newLevel < FUEL_MIN_VALUE) {
      return FUEL_INITIAL_VALUE;
    }

    return newLevel;
  }

}

export default FuelLevelSimulator;