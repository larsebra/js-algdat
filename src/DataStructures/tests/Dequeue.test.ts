import { expect, it, describe } from "bun:test";
import Deque from "../Deque";

describe("Deque", () => {
  const testArray = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20
  ];

  let q = new Deque();

  it("Collection should start of empty()", () => {
    expect(q.isEmpty()).toBe(true);
    expect(q.size()).toBe(0);
  });

  // it("Should throw EmptyQueueError when trying to remove from emptyqueue, front and back", () => {
  //   expect(() => {
  //     q.popFront();
  //   }).to.throw;
  //   expect(() => {
  //     q.popBack();
  //   }).to.throw;
  // });

  it("Should enqueue front correctly", () => {
    for (let i = 9; i >= 0; i--) {
      q.pushFront(testArray[i]);
    }
    let i = 0;
    for (let el of q) {
      expect(el).toBe(testArray[i]);
      i++;
    }
  });

  it("Should enqueue back correctly", () => {
    for (let i = 10; i < 20; i++) {
      q.pushBack(testArray[i]);
    }
    let i = 0;
    for (let el of q) {
      expect(el).toBe(testArray[i]);
      i++;
    }
  });

  it("Size of collection Should be correct after adding elements", () => {
    expect(q.size()).toBe(testArray.length);
  });

  it("Should dequeue front correctly", () => {
    for (let i = 0; i <= 9; i++) {
      expect(q.popFront()).toBe(testArray[i]);
    }
  });

  it("Should dequeue back correctly", () => {
    for (let i = 19; i >= 10; i--) {
      expect(q.popBack()).toBe(testArray[i]);
    }
  });

  it("Should peekLast and peekFirst correctly", () => {
    for (let i = 9; i >= 0; i--) {
      q.pushFront(testArray[i]);
      expect(q.peekFirst()).toBe(testArray[i]);
    }

    for (let i = 10; i < 20; i++) {
      q.pushBack(testArray[i]);
      expect(q.peekLast()).toBe(testArray[i]);
    }
  });
});
