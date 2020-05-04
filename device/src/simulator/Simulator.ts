import SimulatorTypes from './SimulatorTypes';

interface Simulator<T> {
  readonly type: SimulatorTypes;
  getNextValue(): T
}

export default Simulator;
