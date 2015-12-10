import { EventEmitter } from 'events';
import _ from 'lodash';

export default class Elevator extends EventEmitter {

  constructor(id) {
    super();
    this.id = id;
    this.pickups = [];
    this.floor = 1;
    this.targets = [];
    this.direction = null;
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

    //Always handle a sorted target list

    let targets = _.sortBy(this.targets);

    // If we are on a target floor, open door, remove target, remove pickups
    if (targets.indexOf(this.floor)) {
      this.door();
      _.pull(targets, this.floor);
      _.pull(this.pickups, this.floor);
    }

    // If we are have a pickup on this floor then we should open our doors and pick them up
    if (this.pickups.indexOf(this.floor)) {
      this.door();
      _.pull(this.pickups, this.floor);
    }

    //If we have a target we should be making every effort to move that direction
    if (targets.length > 0) {

      //If we haven't been moving, lets set our direction towards furthest target
      if (this.direction === null) {
        let furthestTarget = targets.reduce((prev, curr) => {
          if (!prev) return curr;
          if (Math.abs(curr - this.floor) > Math.abs(prev - this.floor)) return curr;

          return prev;
        });

        if (furthestTarget > this.floor) this.direction = true;
        else this.direction = false;
      }
    }

  }

  get status() {
    return this.instructions;
  }

}
