import { expect, it, describe } from "bun:test";
import LinkedList from "../LinkedList";

describe("LinkedList", function () {
  let list = new LinkedList();
  it("should be empty at start", function () {
    expect(list.isEmpty()).toBe(true);
    expect(list.size()).toBe(0);
  });

  it("Checking iterator", function () {
    let l = new LinkedList();
    l.push(1);
    l.push(2);
    l.push(3);
    l.push(4);
    l.push(5);
    let compArray = [1, 2, 3, 4, 5];
    for (let el of l) {
      expect(el).toBe(compArray.shift());
    }
  });

  it("should add correctly", function () {
    list.unshift(1);
    expect(list.size()).toBe(1);
    expect(list.peekFirst()).toBe(1);
    expect(list.peekLast()).toBe(1);
    list.unshift(2);
    expect(list.size()).toBe(2);
    expect(list.peekFirst()).toBe(2);
    list.push(3);
    expect(list.size()).toBe(3);
    expect(list.peekLast()).toBe(3);
  });

  it("should remove correctly", function () {
    let s = list.size();
    while (list.size() > 0) {
      expect(list.peekLast()).toBe(3);
      expect(list.peekFirst()).toBe(list.shift());
      expect(list.size()).toBe(--s);
    }
  });

  it("should be empty after removing all elements", function () {
    expect(list.isEmpty()).toBe(true);
    expect(list.size()).toBe(0);
  });

  it("Checking iterator", function () {
    let list = new LinkedList();
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
});
