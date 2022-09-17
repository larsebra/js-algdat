import { describe, expect, it } from "bun:test";
import { compareArray } from "src/Common/test-tools/ArraysTools";
import { breadthFirstSearch } from "../BFS";

describe("BFS", function () {
  it("should find the shortest path in an unwheightet graph", function () {
    var graph1 = [
      /*  A   B   C   D   E */
      /* A */ [-1, 0, -1, -1, 0],
      /* B */ [-1, -2, 0, -1, -1],
      /* C */ [-1, -1, -3, 0, -1],
      /* D */ [-1, -1, -1, -4, 0],
      /* E */ [-1, -1, -1, -1, -5]
    ];
    var BFSShortestPath = breadthFirstSearch(0, 3, graph1);
    var actualShortestPath = [0, 1, 2, 3];
    expect(compareArray(actualShortestPath, BFSShortestPath)).toBe(true);
  });
});
