import { EventEmitter } from 'events';

export default class Elevator extends EventEmitter {

  constructor(id) {
    super();
    this.id = id;
    this.pickups = [];
    this.floor = 1;
    this.targets = null;
    this.door = false;
  }

  travel(floor) {
    // Goto a floor
    this.target = floor;
    this.emit('travel', this, this.floor, floor);
  }

  door() {
    //Open/Close Doors
    this.emit('openClose', this, this.door);
  }

  pickUp(floor) {
    // Add a pickup
    this.pickups.push(floor);
  }

  handle() {
    // Handle most important instruction

    // If we are on the target floor, then we are now idle, and have no target
    if (this.floor === this.target) this.target = null;

    // If we are have a pickup on this floor then we should open our doors and pick them up
    if (this.pickups[0] && this.pickups[0] === this.floor) {
      this.door();
      this.pickups(shift);
    }

    //If we have a target we should be making every effort to move that direction
    if (this.target)

  }

  get status() {
    return this.instructions;
  }

}
