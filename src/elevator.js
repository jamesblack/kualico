import { EventEmitter } from 'events';

export default class Elevator extends EventEmitter {

  constructor(id) {
    super();
    this.id = id;
    this.pickups = [];
    this.floor = 1;
    this.target = null;
    this.door = false;
  }

  travel(floor) {
    // Goto a floor
    this.target = floor;
    this.emit('travel', this, this.floor, floor);
  }

  door() {
    //Open/Close Doors
    this.emit('openClose', this);
  }

  goto() {
    this.emit('go', 'awesome');
  }

  handle() {
    // Handle most important instruction

    if (this.floor === this.target) this.target = null;
  }

  get status() {
    return this.instructions;
  }

}
