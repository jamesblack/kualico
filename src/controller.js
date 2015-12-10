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
    this.queue = [];
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

  findElevatorForBuzz(floor) {
    let elevator = null;

    for (var i = 0; i < this.elevators.length; i++) {
      let test = this.elevators[i];

      //Highest priority, idle elevator on that floor
      if (test.target === null && test.floor === floor) {
        elevator = test;
        break;
      }

      //Medium priority, elevator that will pass floor on the way to target
      if (floor >= Math.min(test.floor, test.target) && floor <= Math.max(test.target, test.floor)) {
        elevator = test;
        continue;
      }
    }

    if (elevator === null) {
      //Lowest Priority, closest idle elevator
      elevator = this.elevators.reduce((prev, current) => {
        if (prev === null) return current;

        if (Math.abs(floor - current.floor) < Math.abs(floor - prev.floor)) return current;

        return prev;
      }, null);
    }

    return elevator;
  }

  buzz(floor) {
    let elevator = findElevatorForBuzz(floor);

    if (elevator === null) {
      // If after all of that the elevator is still null put the buzz into the queue;
      queue.push(floor);
    } else {
      elevator.pickUp(floor);
    }
  }
}
