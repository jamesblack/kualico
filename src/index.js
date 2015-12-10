import Controller from './controller';

let buildingA = new Controller(5, 2);
buildingA.init();


buildingA.buzz(5);


setTimeout(() => {
  buildingA.buzz(3);
  buildingA.elevators[0].travel(1);
}, 2000);

setTimeout(() => {
  buildingA.buzz(4);
  buildingA.elevators[0].travel(5);
}, 3000);

setTimeout(() => {
  buildingA.buzz(2);
  buildingA.elevators[1].travel(4);
}, 3000);


setTimeout(() => {
  buildingA.elevators[0].travel(3);
}, 4000);

setInterval(() => {
  buildingA.operate();
}, 1000);
