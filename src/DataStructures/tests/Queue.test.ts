import { expect, describe, it } from "bun:test";
import { randomArrayGenerator } from "src/Common/test-tools/ArraysTools";
import Queue from "../Queue";

describe("Queue: this is tested with 100.000 random numbers", function () {
  const numOfEl = 100000;
  const rangeOfNum = 100000;
  const randomArray = randomArrayGenerator(rangeOfNum, numOfEl, 0, true);
  const q = new Queue<number>();
  let i;

  it("Queue Should start of empty", function () {
    const q = new Queue<number>();
    expect(q.isEmpty()).toBe(true);
    expect(q.size()).toBe(0);
  });

  it("Queue Should iterate correctly", function () {
    let qu = new Queue<number>();
    qu.enqueue(3);
    qu.enqueue(2);
    qu.enqueue(1);
    let comArr = [3, 2, 1];
    for (let el of q) {
      expect(el).toBe(comArr.shift());
    }
  });

  it("Enqueue and Size should return correct amount of elements in q after adding", function () {
    for (let i = 0; i < numOfEl; i++) {
      expect(q.enqueue(randomArray[i])).toBe(i + 1);
      expect(q.size()).toBe(i + 1);
    }
  });

  it("Dequeue should return the right elements, dequeue all elements.", function () {
    for (i = 0; i < numOfEl; i++) {
      expect(q.dequeue()).toBe(randomArray[i]);
    }
  });

  it("Queue should be empty after dequeueing all elements", function () {
    expect(q.isEmpty()).toBe(true);
    expect(q.size()).toBe(0);
  });

  it("Should enque and dequeue correctly", function () {
    var to = numOfEl / 2;
    for (i = 0; i < to; i++) {
      expect(q.enqueue(randomArray[i])).toBe(i + 1);
    }

    expect(q.size()).toBe(numOfEl / 2);

    for (i = 0; i < to; i++) {
      expect(q.dequeue()).toBe(randomArray[i]);
    }

    expect(q.isEmpty()).toBe(true);
    expect(q.size()).toBe(0);

    for (i = 0; i < numOfEl; i++) {
      expect(q.enqueue(randomArray[i])).toBe(i + 1);
    }

    for (i = 0; i < numOfEl; i++) {
      expect(q.dequeue()).toBe(randomArray[i]);
    }

    expect(q.isEmpty()).toBe(true);
    expect(q.size()).toBe(0);
  });

  it("Peek should always point at the first element in line", function () {
    for (i = 0; i < randomArray.length; i++) {
      q.enqueue(randomArray[i]);
      expect(q.peekFirst()).toBe(randomArray[0]);
    }
    for (; i > 0; i--) {
      var peek = q.peekFirst();
      expect(q.dequeue()).toBe(peek);
    }
  });
});
