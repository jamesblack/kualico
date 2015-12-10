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
    for (let i = 0; i < this.elevatorCount; i++) {
      this.elevators.push(new Elevator(i));
      this.elevators[i].on('travel', this.onTravel.bind(this));
      this.elevators[i].on('openClose', this.onOpenClose.bind(this));
    }
  }

  operate() {
    // Tells individual elevators to handle their next operation, failing to call this would cause elevators to stop functioning. Useful in case of emergencies;
  }

  onTravel(elevator, leaving, target) {
    console.log(`Elevator ${elevator.id} is leaving floor ${leaving} and heading for floor ${target}.`);
  }

  onOpenClose(elevator, state) {
    console.log(`Elevator ${elevator.id} is ${state ? 'closing' : 'opening'} its doors.`);
  }

  buzz(floor) {
    console.log(this.elevators);
    this.elevators[0].travel(2);
  }
}
