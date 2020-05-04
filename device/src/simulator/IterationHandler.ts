class IterationHandler {

  private iteration: number = 0;

  constructor(
    private maxIterations: number,
    private action: Function
  ) { }

  public nextIteration() {
    if (this.iteration === this.maxIterations) {
      this.iteration = 0;
      this.action();
    } else {
      this.iteration++;
    }
  }

}

export default IterationHandler;
