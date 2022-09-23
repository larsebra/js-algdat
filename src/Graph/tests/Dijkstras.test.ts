import { describe, it, expect } from "bun:test";
import { compareArray } from "src/Common/test-tools/ArraysTools";
import { dijkstras } from "../Dijstras";

describe("Dijstras Shortest Path Algorithm", function () {
  it("Should be able to find correct shortest path 1", function () {
    var graph1 = [
      /*        A  B   C   D  E */
      /* A */ [Infinity, 1, Infinity, Infinity, 5],
      /* B */ [Infinity, Infinity, 1, Infinity, Infinity],
      /* C */ [Infinity, Infinity, Infinity, 1, Infinity],
      /* D */ [Infinity, Infinity, Infinity, Infinity, 1],
      /* E */ [Infinity, Infinity, Infinity, Infinity, Infinity]
    ];

    const dijstrasShortestPath = dijkstras(0, 4, graph1);
    const actualShortestPath = [0, 1, 2, 3, 4];
    expect(compareArray(actualShortestPath, dijstrasShortestPath)).toBe(true);
  });

  it("Should be able to find correct shortest path 2", () => {
    const graph2 = [
      /*        A  B   C   D  E */
      /* A */ [Infinity, 1, Infinity, Infinity, 4],
      /* B */ [Infinity, Infinity, 1, Infinity, Infinity],
      /* C */ [Infinity, Infinity, 1, 1, Infinity],
      /* D */ [Infinity, Infinity, Infinity, Infinity, 1],
      /* E */ [Infinity, Infinity, Infinity, Infinity, Infinity]
    ];

    const dijstrasShortestPath = dijkstras(0, 4, graph2);
    const actualShortestPath = [0, 4];
    expect(compareArray(actualShortestPath, dijstrasShortestPath)).toBe(true);
  });

  it("Should be able to find correct shortest path 3", () => {
    const graph3 = [
      /*        A  B   C   D  E */
      /* A */ [Infinity, 1, Infinity, Infinity, Infinity],
      /* B */ [Infinity, Infinity, 0, 1, Infinity],
      /* C */ [Infinity, Infinity, Infinity, Infinity, 5],
      /* D */ [Infinity, Infinity, Infinity, Infinity, 2],
      /* E */ [Infinity, Infinity, Infinity, Infinity, Infinity]
    ];

    const dijstrasShortestPath = dijkstras(0, 4, graph3);
    const actualShortestPath = [0, 1, 3, 4];
    expect(compareArray(actualShortestPath, dijstrasShortestPath)).toBe(true);
  });
});
