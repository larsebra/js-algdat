import { describe, expect, it } from "bun:test";
import { binarySearchFind, binarySearchFindIndex } from "../BinarySearch";

describe("BinarySearch", () => {
  it("Should return -1 when element is not in array", () => {
    const a = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    expect(binarySearchFindIndex(0, a)).toBe(-1);
  });
  it("Should find the correct index in the array", () => {
    const a = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    expect(binarySearchFindIndex(5, a)).toBe(4);
  });
  it("Should return undefined when element is not in array", () => {
    const a = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    expect(binarySearchFind(0, a)).toBe(undefined);
  });
  it("Should find the correct index in the array", () => {
    const a = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    expect(binarySearchFind(5, a)).toBe(5);
  });
});
