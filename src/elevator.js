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
    this.trips = 0;
    this.floors = 0;
    this.top = top;
  }

  travel(floor) {
    // Goto a floor
    this.targets.push(floor);
    console.log(`Elevator ${this.id} has been requested to goto floor ${floor}`);
  }

  move(floor) {
    if (floor < 1 || floor > this.top) {
      console.error('You tried to move out of bounds');
      return;
    }

    if (this.doorState) this.door(false);
    this.floors++;
    this.emit('travel', this, this.floor, floor);
    this.floor = floor;
  }

  door(state) {
    //Open/Close Doors
    this.doorState = state;
    this.emit('openClose', this, state);
  }

  pickUp(floor) {
    // Add a pickup
    if (this.targets.length < 1 && floor === this.floor) this.door(true);

    this.pickups.push(floor);
  }

  handle() {
    // Handle most important instruction

    // DO NOT DO ANYTHING if in MAITENANCE MODE!
    if (this.trips > 100) return;



    // If we are on a target floor, open door, remove target, remove pickups
    if (this.targets.indexOf(this.floor) !== -1) {
      this.door(true);
      _.pull(this.targets, this.floor);
      _.pull(this.pickups, this.floor);
      this.trips++;
      return;
    }

    // If we are have a pickup on this floor then we should open our doors and pick them up
    if (this.pickups.indexOf(this.floor) !== -1) {
      this.door(true);
      _.pull(this.pickups, this.floor);
      return;
    }

    // If we have no targets, but we do have pickups, add pickups to targets
    if (this.targets.length < 1 && this.pickups.length > 0) {
      this.pickups.forEach((pickup) => this.targets.push(pickup));
    }

    //If we have a target we should be making every effort to move that direction
    if (this.targets.length > 0) {
      // We should see if we still have targets in our current direction, and if not nullify it
      if (this.direction !== null) {
        if (this.direction && !_.some(this.targets, (target) => target > this.floor)) this.direction = null;
        if (!this.direction && !_.some(this.targets, (target) => target < this.floor)) this.direction = null;
      }
      //If we haven't been moving, lets set our direction towards furthest target
      if (this.direction === null) {
        let furthestTarget = this.targets.reduce((prev, curr) => {
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
    if (this.direction !== null) this.direction = null;
    return;
  }
}
