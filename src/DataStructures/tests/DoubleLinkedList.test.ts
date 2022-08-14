import { expect, describe, it } from "bun:test";
import { randomIntegerInRange } from "src/Common/test-tools/Random";
import DoubleLinkedList from "../DoubleLinkedList";

/**
 * TODO: fix tests that is not yet supported by bun
 */
describe("DoubleLinkedList", () => {
  //The list
  const list = new DoubleLinkedList<number>();

  let i = 0; //keeps track of current index in list, and over the different tests.
  const to = 10000; // a variable that decides how many elements to remove and add
  let lastLast = 0; //Variable that always points to the last value in list
  let lastFirst = 0; //Variable that always points to the first value in list
  let listAsItShouldBe = [];

  it("should be empty at start", () => {
    expect(list.isEmpty()).toBe(true);
    expect(list.size()).toBe(0);
  });

  it("should add correctly", () => {
    for (i = 0; i < to; i++) {
      //Alter between method to use when removing
      if (randomIntegerInRange(1) === 0) {
        lastFirst = i;

        // Alter between method to use for adding
        if (randomIntegerInRange(1) === 0) {
          expect(list.unshift(lastFirst)).toBe(i + 1);
        } else {
          expect(list.addInPosition(lastFirst, 0)).toBe(i + 1);
        }

        expect(list.peekFirst()).toBe(lastFirst);
      } else {
        lastLast = i;

        // Alter between method to use for adding
        if (randomIntegerInRange(1) === 0) {
          expect(list.push(lastLast)).toBe(i + 1);
        } else {
          expect(list.addInPosition(lastLast, i)).toBe(i + 1);
        }

        expect(list.peekLast()).toBe(lastLast);
      }

      expect(list.size()).toBe(i + 1);
    }
  });

  it("Checking iterator", () => {
    let list = new DoubleLinkedList();
    list.push(1);
    list.push(2);
    list.push(3);
    list.push(4);
    list.push(5);
    let compArray = [1, 2, 3, 4, 5];
    for (let el of list) {
      expect(el).toBe(compArray.shift());
    }
  });

  it("should remove correctly", () => {
    var s = list.size();
    while (s > 0) {
      //Alter between removing first and moving last
      if (randomIntegerInRange(1) === 0) {
        //Change between method to use when removing, to test both
        if (randomIntegerInRange(1) === 0) {
          expect(list.shift()).toBe(lastFirst);
        } else {
          expect(list.splice(0)).toBe(lastFirst);
        }
        try {
          lastFirst = list.peekFirst();
        } catch (err) {
          //Should evantually throw emptyList error
          expect(err.name).toBe("EmptyListError");
        }
      } else {
        //Change between method to use when removing, to test both
        if (randomIntegerInRange(1) === 0) {
          expect(list.pop()).toBe(lastLast);
        } else {
          expect(list.splice(s - 1)).toBe(lastLast);
        }

        try {
          lastLast = list.peekLast();
        } catch (err) {
          //Should evantually throw emptyList error
          expect(err.name).toBe("EmptyListError");
        }
      }
      try {
        expect(list.peekFirst()).toBe(lastFirst);
        expect(list.peekLast()).toBe(lastLast);
      } catch (err) {
        //Should evantually throw emptyList error
        expect(err.name).toBe("EmptyListError");
      } finally {
        s--;
        expect(list.size()).toBe(s);
      }
    }
  });

  it("should be empty after removing all elments", () => {
    expect(list.isEmpty()).toBe(true);
    expect(list.size()).toBe(0);
  });

  // it("Should throw error when trying to remove from an empty list", () => {
  //   expect(() => {
  //     list.shift();
  //   }).to.throw();
  //   expect(() => {
  //     list.pop();
  //   }).to.throw();
  // });

  it("should add and remove correctly; checking a edge case", () => {
    for (i = 0; i < 10; i++) {
      //Adding a number first
      expect(list.unshift(1)).toBe(1);
      expect(list.peekFirst()).toBe(1);
      expect(list.peekLast()).toBe(1);

      //Adding a second element
      expect(list.unshift(2)).toBe(2);
      expect(list.peekFirst()).toBe(2);
      expect(list.peekLast()).toBe(1);

      //adding third element
      expect(list.push(3)).toBe(3);
      expect(list.peekLast()).toBe(3);
      expect(list.peekFirst()).toBe(2);

      //Removing them all, remove last is
      if (randomIntegerInRange(1) === 0) {
        expect(list.shift()).toBe(2);
        expect(list.shift()).toBe(1);
        expect(list.shift()).toBe(3);
      } else {
        expect(list.pop()).toBe(3);
        expect(list.pop()).toBe(1);
        expect(list.pop()).toBe(2);
      }

      expect(list.isEmpty()).toBe(true); //List must be empty now
    }
  });

  it("should insert in position correctly", () => {
    const numbersToAdd = 10;
    const numbersToAddInMiddle = Math.round(numbersToAdd / 2);
    let randomNumber = 0;
    const randomNumRange = 1000;
    const middle = Math.round(numbersToAdd / 2);

    //Adding numbers in order
    for (i = 0; i < numbersToAdd; i++) {
      expect(list.push(i + 1)).toBe(i + 1);
      if (i < middle) {
        listAsItShouldBe.push(i + 1);
      }
    }

    //Check that add added correctly, the list should be in ascending order.
    for (i = 0; i < numbersToAdd; i++) {
      expect(list.getValAtPosition(i)).toBe(i + 1);
    }

    //Replace some of the values in the middle of the list with random values
    for (i = 0; i < numbersToAddInMiddle; i++) {
      randomNumber = randomIntegerInRange(randomNumRange);
      const oldSize = list.size();
      expect(list.addInPosition(randomNumber, middle)).toBe(oldSize + 1);

      //The addInPosition method gives the same result as Arrays splice.
      listAsItShouldBe.splice(middle, 0, randomNumber);
    }

    //Add rest of the numbers in expected
    for (i = middle; i < numbersToAdd; i++) {
      listAsItShouldBe.push(i + 1);
    }

    //Check that numbers are correspond with the expected correct array.
    for (i = 0; i < numbersToAdd + numbersToAddInMiddle; i++) {
      expect(list.getValAtPosition(i)).toBe(listAsItShouldBe[i]);
    }
  });

  it("should remove in position correctly", () => {
    let correctElementToRemove = 0;
    const middle = Math.floor(list.size() / 2) - 1;
    let to = Math.floor(list.size() / 3);

    for (i = 0; i < to; i++) {
      correctElementToRemove = listAsItShouldBe.splice(middle, 1)[0];
      const removedEl = list.splice(middle);
      expect(removedEl).toBe(correctElementToRemove);
    }

    for (i = 0; i < to; i++) {
      correctElementToRemove = listAsItShouldBe.splice(i, 1)[0];
      const removedEl = list.splice(i);
      expect(removedEl).toBe(correctElementToRemove);
    }
    to = list.size();
    for (i = 0; i < to; i++) {
      correctElementToRemove = listAsItShouldBe.splice(0, 1)[0];
      const removedEl = list.splice(0);
      expect(removedEl).toBe(correctElementToRemove);
    }
    expect(list.isEmpty()).toBe(true);
  });
});
