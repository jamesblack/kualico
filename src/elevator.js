import { EventEmitter } from 'events';
import _ from 'lodash';

export default class Elevator extends EventEmitter {

  constructor(id, top) {
    super();
    this.id = id;
    this.pickups = [];
    this.floor = 1;
    this.targets = [];
    this.direction = null;
    this.doorState = false;
    this.top = top;
  }

  travel(floor) {
    // Goto a floor
    this.targets.push(floor);
  }

  move(floor) {
    if (floor < 1 || floor > this.top) {
      console.error('You tried to move out of bounds');
      return;
    }
    this.emit('travel', this, this.floor, floor);
  }

  door(state) {
    //Open/Close Doors
    this.emit('openClose', this, state);
  }

  pickUp(floor) {
    // Add a pickup
    this.pickups.push(floor);
  }

  handle() {
    // Handle most important instruction

    let targets = this.targets;

    // If we are on a target floor, open door, remove target, remove pickups
    if (targets.indexOf(this.floor)) {
      this.door(true);
      _.pull(targets, this.floor);
      _.pull(this.pickups, this.floor);
      return;
    }

    // If we are have a pickup on this floor then we should open our doors and pick them up
    if (this.pickups.indexOf(this.floor)) {
      this.door(true);
      _.pull(this.pickups, this.floor);
      return;
    }

    // If we have no targets, but we do have pickups, add pickups to targets
    if (targets.length < 1 && this.pickups.length > 0) {
      this.pickups.forEach((pickup) => this.targets.push(pickup));
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

      // Head towards targets in whichever direction we are heading

      this.move(this.floor + (this.direction ? 1 : -1));
      return;
    }

    // If we have no targets, then we dont really do much just make sure doors are closed i guess

    if (this.doorState) this.door(false);
    return;
  }
}
