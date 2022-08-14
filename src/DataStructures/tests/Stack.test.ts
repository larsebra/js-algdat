import { expect, describe, it } from "bun:test";
import Stack from "../Stack";

describe("Stacks", () => {
  it("Should push and pop correctly", () => {
    var stack = new Stack();
    expect(stack.size()).toBe(0);
  });

  it("Should push and pop correctly", () => {
    var stack = new Stack();

    stack.push("hello1");
    stack.push("hello2");
    stack.push("hello3");

    expect(stack.size() === 3).toBe(true);
    expect(stack.pop() === "hello3").toBe(true);
    expect(stack.size()).toBe(2);
    expect(stack.peek() === "hello2").toBe(true);
    expect(stack.pop() === "hello2").toBe(true);
    expect(stack.size()).toBe(1);
    expect(stack.pop() === "hello1").toBe(true);
    expect(stack.isEmpty() === true).toBe(true);
    expect(stack.push("hello1")).toBe(1);
  });
});
