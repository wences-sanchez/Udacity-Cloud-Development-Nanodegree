import { add, divide } from './units';

import { expect } from 'chai';
import 'mocha';
import {Car} from "../cars";

// describe('add function', () => {
//
//   it('should add two and two', () => {
//     const result = add(2,2);
//     expect(result).to.equal(4);
//   });
//
//   it('should add -2 and two', () => {
//     const result = add(-2,2);
//     expect(result).to.equal(0);
//   });
//
// });
//
// describe('divide', () => {
//
//   it('should divide 6 by 3', () => {
//     const result = divide(6,3);
//     expect(result).to.equal(2);
//   });
//
//   it('should divide 5 and 2', () => {
//     const result = divide(5,2);
//     expect(result).to.equal(2.5);
//   });
//
//   it('should throw an error if div by zero', () => {
//     expect(()=>{ divide(5,0) }).to.throw('div by 0')
//   });
//
// });

describe("Cars Test Suite", () => {

  let cars: Car[];

  before(() => {
    cars = [
      {make: 'tesla', type: 'sedan', model: 'roadster', cost: 33, id: 0},
      {make: 'tesla', type: 'suv', model: 'model 3', cost: 48, id: 1},
      {make: 'toyota', type: 'sedan', model: 'prius', cost: 22, id: 2},
      {make: 'honda', type: 'sedan', model: 'civic', cost: 22, id: 3},
    ];
  });

  describe("An item in car list", () => {
    it("Should include all correct fields", () => {
      const item: Car = cars[0];
      expect(item.make).to.equal("tesla");
      expect(item.type).to.equal("sedan");
      expect(item.model).to.equal("roadster");
      expect(item.cost).to.equal(33);
      expect(item.id).to.equal(0);
    });
  });
});

// @TODO try creating a new describe block for the "concat" method
// it should contain an it block for each it statement in the units.ts @TODO.
// don't forget to import the method ;)
