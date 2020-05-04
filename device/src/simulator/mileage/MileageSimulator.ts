import Simulator from '../Simulator';
import SimulatorTypes from '../SimulatorTypes';
import IterationHandler from '../IterationHandler';

const MILEAGE_INITIAL_VALUE = 121457;
const MILEAGE_STEP = 1;
const INTERVAL = 5;

class MileageSimulator implements Simulator<number> {

  public readonly type = SimulatorTypes.MILEAGE;
  private iterationHandler = new IterationHandler(INTERVAL, () => this.setNewValue())
  private lastValue: number = MILEAGE_INITIAL_VALUE;

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
    const newMileage = this.lastValue + MILEAGE_STEP;
    return newMileage;
  }
}

export default MileageSimulator;
