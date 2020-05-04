import { random, floor, round } from 'lodash';

import Simulator from '../Simulator';
import SimulatorTypes from '../SimulatorTypes';
import IterationHandler from '../IterationHandler';

const TYRES_PRESSURE_INITIAL_VALUE = [ 8.1, 8.0, 7.8, 8.0 ];
const TYRES_PRESSURE_STEP = 0.1;
const INTERVAL = 50;

class TyresPressureSimulator implements Simulator<number[]> {

  public readonly type = SimulatorTypes.TYRES_PRESSURE;
  private interationHandler = new IterationHandler(INTERVAL, () => this.setNewValue());
  private lastValue: number[] = TYRES_PRESSURE_INITIAL_VALUE;

  public getNextValue(): number[] {
    this.handleIteration();
    return this.lastValue;
  }

  private handleIteration(): void {
    this.interationHandler.nextIteration();
  }

  private setNewValue(): void {
    this.lastValue = this.generateValue();
  }

  private generateValue(): number[] {
    const currentPressure = this.lastValue;

    const tyreIndex = random(0, currentPressure.length - 1);
    const newPressure = random(
      currentPressure[tyreIndex] - TYRES_PRESSURE_STEP,
      currentPressure[tyreIndex] + TYRES_PRESSURE_STEP
    );

    return currentPressure.map((pressure, index) => index === tyreIndex
      ? round(newPressure, 1)
      : pressure
    );
  }

}

export default TyresPressureSimulator;
