/**
 * Representing a Node in search algorithm
 */
export type GraphSearchNode<T> = {
  identifier: T;
  edgeCost: number;
};

export interface GraphSearch<T> {
  size?: number;
  isEqual(n1: T, n2: T): boolean;
  getNeighbours(n: GraphSearchNode<T>): Array<GraphSearchNode<T>>;
}

export interface HeuristicGraphSearch<T> extends GraphSearch<T> {
  heurisitc(node: T, toNode: T): number;
}
