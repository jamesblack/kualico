import Elevator from './elevator';

/**
 * Elevator controller
 * Manages all elevators as well as keeping track of the information regarding the building to which it is installed
 */


export default class Controller {
  constructor(floorCount, elevatorCount) {
    this.floorCount = floorCount;
    this.elevatorCount = elevatorCount;
    this.elevators = [];
  }

  init() {
    for (let i = 0; i < elevatorCount; i++) {
      this.elevators.push(new Elevator());
    }
  }

  buzz(floor) {
    // On Buzz send an elevator to that floor to recieve
  }
}
