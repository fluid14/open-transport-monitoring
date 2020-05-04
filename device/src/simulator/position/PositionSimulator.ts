import Simulator from '../Simulator';
import SimulatorTypes from '../SimulatorTypes';
import Routes from './Routes';

class PositionSimulator implements Simulator<[number, number]> {

  public readonly type = SimulatorTypes.POSITION;
  private lastIndex: number = 0;
  private route = Routes.getRandom();

  public getNextValue(): [ number, number ] {
    this.handleIteration();
    return this.generateVaule();
  }

  private handleIteration(): void {
    this.lastIndex = this.lastIndex >= this.route.length
      ? 0
      : this.lastIndex + 1;

  }

  private generateVaule(): [ number, number ] {
      const newPosition = this.route[this.lastIndex];

      return [ newPosition.lat, newPosition.lng ];
  }

}

export default PositionSimulator;
