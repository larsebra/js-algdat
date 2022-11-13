import GraphNode from "src/Common/GraphNode";
import { GraphSearch, GraphSearchNode } from "./Dijstras";
import { HeuristicGraphSearch } from "./GraphSearch";

function nodeInBoundsOfGrid(grid: number[][], box: [number, number]) {
  const h = grid.length;
  const w = grid[0].length;
  if (box[0] < 0 || box[0] >= h || box[1] < 0 || box[1] >= w) return false;
  return true;
}

const EdgeDirs: Record<"N" | "E" | "S" | "V", [number, number]> = {
  N: [-1, 0],
  E: [0, 1],
  S: [1, 0],
  V: [0, -1]
};

function getAdjecent(grid: number[][], cn: [number, number]) {
  const adj = [];
  for (let d in EdgeDirs) {
    const n: [number, number] = [
      EdgeDirs[d][0] + cn[0],
      EdgeDirs[d][1] + cn[1]
    ];

    if (!nodeInBoundsOfGrid(grid, n) || grid[n[0]][n[1]] === Infinity) continue;
    const cost = grid[cn[0]][cn[1]] / 2 + grid[n[0]][n[1]] / 2;
    const node = { identifier: n, cost };
    adj.push(node);
  }
  return adj;
}

export function makeGridGraph(grid: number[][]) {
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      const n: [number, number] = [row, col];
      const adj = getAdjecent(grid, n);
      const node = new GraphNode<[number, number]>(n);
      node.addNeighbour(adj);
    }
  }

  return null;
}

export class GridGraph implements GraphSearch<[number, number]> {
  size?: number;
  private graph;

  constructor(graph) {
    this.size = 500;
    this.graph = graph;
  }

  isEqual(n1: [number, number], n2: [number, number]): boolean {
    return n1.toString() === n2.toString();
  }
  getNeighbours(
    n: GraphSearchNode<[number, number]>
  ): GraphSearchNode<[number, number]>[] {
    return getAdjecent(this.graph, n.identifier);
  }
}

export class GridGraphHeuristic
  implements HeuristicGraphSearch<[number, number]>
{
  size?: number;
  private graph;

  constructor(graph) {
    this.size = 500;
    this.graph = graph;
  }

  isEqual(n1: [number, number], n2: [number, number]): boolean {
    return n1.toString() === n2.toString();
  }

  getNeighbours(
    n: GraphSearchNode<[number, number]>
  ): GraphSearchNode<[number, number]>[] {
    return getAdjecent(this.graph, n.identifier);
  }

  /**
   * Manhatten distance
   *
   * @param node
   * @param toNode
   * @returns manhatten distance
   */
  heurisitc(node: [number, number], toNode: [number, number]) {
    return Math.sqrt(
      Math.abs(node[0] - toNode[0]) + Math.abs(node[1] - toNode[1])
    );
  }
}
