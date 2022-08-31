import { describe, expect, it } from "bun:test";
import BinaryHeap from "../BinaryHeap";

const comparator = (a: number, b: number) => {
  if (a < b) {
    return -1;
  } else if (a > b) {
    return 1;
  } else {
    return 0;
  }
};

describe("BinaryHeap", () => {
  const numberOfElmenetsInHeap = 10;
  const heap = new BinaryHeap(numberOfElmenetsInHeap, comparator);
  const compArray = [10, 3, 11, 1, 9, 68, 5, 3, 2, 0];
  compArray.sort(comparator);

  it("should be empty when non elements are added", () => {
    expect(heap.isEmpty()).toBe(true);
  });

  it("add should return correct size after adding", () => {
    compArray.forEach((element, index) => {
      expect(heap.add(element)).toBe(index + 1);
    });
  });

  it("size should be correct after adding", () => {
    expect(heap.size()).toBe(10);
  });

  it("should be full after filling up the whole heap", () => {
    expect(heap.isFull()).toBe(true);
  });

  it("Should have the smallest element at root", () => {
    expect(heap.peek()).toBe(0);
  });

  it("itereator should iterate correctly", () => {
    let index = 0;
    for (let i of heap) {
      expect(i).toBe(compArray[index]);
      index++;
    }
  });

  it("Should remove in the correct order", () => {
    compArray.forEach((int) => {
      expect(int).toBe(heap.remove());
    });
  });
});
