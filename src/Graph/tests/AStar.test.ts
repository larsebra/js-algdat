import { describe, expect, test } from "bun:test";
import { compareArray } from "src/Common/test-tools/ArraysTools";
import AStar from "../Astar";
import { GridGraphHeuristic } from "../GridGraph";

describe("A*", () => {
  test("Should find the shortest path given a monotonic and admissable heurisitc", () => {
    const graph = new GridGraphHeuristic([
      [1, 1, 1, 2, 2],
      [1, 1, Infinity, 2, 1],
      [Infinity, Infinity, Infinity, 2, 5],
      [1, 1, 2, 0, 2],
      [1, 1, 0, 1, 0]
    ]);

    const aStarShortestPath = AStar([0, 0], [4, 4], graph);
    const actualShortestPath = [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
      [1, 4],
      [2, 4],
      [3, 4],
      [4, 4]
    ];

    expect(
      compareArray(
        actualShortestPath,
        aStarShortestPath,
        (a: [number, number], b: [number, number]) => {
          if (a.toString() == b.toString()) return true;
          return false;
        }
      )
    ).toBe(true);
  });
});
