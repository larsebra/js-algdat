import AVLTree from "src/Trees/AVLTree";
import { GraphSearchNode, HeuristicGraphSearch } from "./GraphSearch";

/**
 *
 *  █████
 * ██   ██  ▄ ██ ▄
 * ███████   ████
 * ██   ██  ▀ ██ ▀
 * ██   ██
 *
 * An implementation of the Astar algorithm
 *
 * @param fromNode
 * @param toNode
 * @param heuristic
 * @param graph
 * @returns
 */

interface AstarGraphNode extends GraphSearchNode<any> {
  cost: number;
  cameFrom: AstarGraphNode | null;
}

export default function AStar<T = any>(
  fromNode: GraphSearchNode<T>["identifier"],
  toNode: GraphSearchNode<T>["identifier"],
  graph: HeuristicGraphSearch<T>
) {
  //Creating a binary heap as the priority queue.
  const priQueue = new AVLTree<AstarGraphNode>((a, b) => {
    //The less than operator here will cause equal cost nodes to be visited in a fifo manner.
    return a.cost > b.cost ? -1 : 1;
  });

  //The node currently visited.
  let currentNode: AstarGraphNode = null;

  //A boolean array used to mark visited node
  const visited: Record<string, boolean> = {};

  //Add the first node(source) to the queue.
  priQueue.push({
    identifier: fromNode,
    edgeCost: 0,
    cost: 0,
    cameFrom: null
  });

  let foundNode: AstarGraphNode = null;

  while (!priQueue.isEmpty()) {
    currentNode = priQueue.popSmallest();

    if (graph.isEqual(currentNode.identifier, toNode)) {
      foundNode = currentNode;
      break;
    }

    // No need to visit same node twise.
    if (visited[currentNode.identifier]) continue;

    // Mark as visited
    visited[currentNode.identifier] = true;

    //Open neighbours
    const neighbours = graph.getNeighbours(currentNode);

    neighbours.forEach((n) => {
      priQueue.push({
        //Neighbour node nr relative to currentNode
        ...n,
        //Total cost so far to currentNode + cost of the path from current to neighbour
        cost:
          currentNode.cost + n.edgeCost + graph.heurisitc(n.identifier, toNode),
        //Store the reference to currentNode, used to find the path taken to this node
        cameFrom: currentNode
      });
    });
  }

  const shortestPath = [];

  for (let n = foundNode; n != null; n = n.cameFrom) {
    shortestPath.push(n.identifier);
  }

  return shortestPath.reverse();
}
