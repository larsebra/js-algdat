import BinaryHeap from "src/Trees/BinaryHeap";
import { GraphSearch, GraphSearchNode } from "./GraphSearch";

/**
 * ,---,                             ,-.             ___
 * .'  .' `\    ,--,               ,--/ /|           ,--.'|_
 * ,---.'     \ ,--.'|         .--.,--. :/ |           |  | :,'   __  ,-.
 * |   |  .`\  ||  |,        .--,`|:  : ' /  .--.--.   :  : ' : ,' ,'/ /|             .--.--.
 * :   : |  '  |`--'_        |  |. |  '  /  /  /    '.;__,'  /  '  | |' | ,--.--.    /  /    '
 * |   ' '  ;  :,' ,'|       '--`_ '  |  : |  :  /`./|  |   |   |  |   ,'/       \  |  :  /`./
 * '   | ;  .  |'  | |       ,--,'||  |   \|  :  ;_  :__,'| :   '  :  / .--.  .-. | |  :  ;_
 * |   | :  |  '|  | :       |  | ''  : |. \\  \    `. '  : |__ |  | '   \__\/: . .  \  \    `.
 * '   : | /  ; '  : |__     :  | ||  | ' \ \`----.   \|  | '.'|;  : |   ," .--.; |   `----.   \
 * |   | '` ,/  |  | '.'|  __|  : ''  : |--'/  /`--'  /;  :    ;|  , ;  /  /  ,.  |  /  /`--'  /
 * ;   :  .'    ;  :    ;.'__/\_: |;  |,'  '--'.     / |  ,   /  ---'  ;  :   .'   \'--'.     /
 * |   ,.'      |  ,   / |   :    :'--'      `--'---'   ---`-'         |  ,     .-./  `--'---'
 * '---'         ---`-'   \   \  /                                      `--`---'
 *                   `--`-'
 *
 * dijkstras - This an implementation of dijkstras algorithm for finding the shortest path between two nodes in a graph.
 *
 * This implementation operates on a given 2d array of this form:
 *     +----+----+----+----+----+
 *     |    |  A |  B |  C |  D |
 *     +------------------------+
 *     |  A |  i |  X |  X |  X |
 *     +------------------------+
 *     |  B |  X |  i |  X |  X |
 *     +------------------------+
 *     |  C |  X |  X |  i |  X |
 *     +------------------------+
 *     |  D |  X |  X |  X |  i |
 *     +----+----+----+----+----+
 *
 * Here A, B, C, D denotes the nodes in the graph, the letter x is a number representing cost, and whether or not there is a
 * path between the nodes. If there exists a path between nodes A and B there must be a number < infinity (i) in the cell [A][B], if the
 * number in the cell is infinity, there is assumed that a path between the nodes does not exist.
 * Further, the graph is assumed to be directional, so each row denotes from and each column means to, so cell [C][A] means
 * there exists a directed path between C and A that goes from C to A with cost X; C ---X---> A.
 * The letters in the array are just for illustration purposes, the array should only contain numbers indicating cost on the
 * path between the nodes.
 *
 * Implementation details:
 *  For priority queue this implementation uses a binaryheap. If nodes with equal cost paths are added, the first node added
 *  is served first, then the second, etc..
 *
 * Time Complexity:
 *
 * Space Complexity:
 *
 * @param  {Number} fromNode The node to start from
 * @param  {Number} toNode   The goal node
 * @param  {Array}  graph    The given graph to search in.
 * @return {Array}           An array containing the shortest path, where the first element is the start node
 *                           and the last element is the goal node. If no path exists it will return a empty array.
 *
 */
export function dijkstrasArrayGraph(fromNode: number, toNode: number, graph) {
  if (
    !(0 <= fromNode && fromNode < graph.length) ||
    !(0 <= toNode && toNode < graph.length)
  ) {
    const e = new Error();
    e.name = "OutOfBoundsError";
    e.message = "fromNode or toNode is out of bounds";
    throw e;
  }

  //Return array containing numbers indicating the shortest path.
  let shortestPath = [];
  //Creating a binary heap as the priority queue.
  const priQueue = new BinaryHeap(graph.length, (a, b) => {
    //The less than operator here will cause equal cost nodes to be visited in a fifo manner.
    return a.cost < b.cost ? -1 : 1;
  });
  //The node currently visited.
  let currentNode = null;
  //A boolean array used to mark visited node
  const visited = new Array(graph.length).fill(false);
  //Add the first node(source) to the queue.
  priQueue.add({ nodeNr: fromNode, cost: 0, cameFrom: null, NrOfHops: 0 });

  while (!priQueue.isEmpty()) {
    //Remove the node with the shortest distance from source and visit it.
    currentNode = priQueue.remove();

    //No need to visit a node two times.
    if (visited[currentNode.nodeNr]) {
      continue;
    }

    //Mark as visited
    visited[currentNode.nodeNr] = true;

    //Check if currentNode is the goal node, the shortest path must be reached.
    if (currentNode.nodeNr === toNode) {
      //Calculate the shortest path by traversing the found path backwards
      let fromNode = currentNode;
      let j = fromNode.NrOfHops;
      //Add each node in the path to the return array.
      while (fromNode !== null) {
        shortestPath[j--] = fromNode.nodeNr;
        fromNode = fromNode.cameFrom;
      }
      break;
    }

    //Open Neighbour nodes and put them in the priority queue if they do not exists in it
    for (let i = 0; i < graph.length; i++) {
      //Skip if not edge between
      if (graph[currentNode.nodeNr][i] === Infinity) {
        continue;
      }

      priQueue.add({
        //Neighbour node nr relative to currentNode
        nodeNr: i,
        //Total cost so far to currentNode + cost of the path from current to neighbour
        cost: currentNode.cost + graph[currentNode.nodeNr][i],
        //Store the reference to currentNode, used to find the path taken to this node
        cameFrom: currentNode,
        //How many node hops has been made since the beginning to reach this node
        NrOfHops: currentNode.NrOfHops + 1
      });
    }
  }
  return shortestPath;
}

interface DijkstrasInnerNode extends GraphSearchNode<any> {
  //Total cost so far to currentNode + cost of the path from current to neighbour
  cost: number;
  //Store the reference to currentNode, used to find the path taken to this node
  cameFrom: DijkstrasInnerNode | null;
}
export function dijkstras<T = any>(
  fromNode: GraphSearchNode<T>["identifier"],
  toNode: GraphSearchNode<T>["identifier"],
  graph: GraphSearch<T>
) {
  //Return array containing numbers indicating the shortest path.
  let shortestPath = [];
  //Creating a binary heap as the priority queue.
  const priQueue = new BinaryHeap<DijkstrasInnerNode>(50, (a, b) => {
    //The less than operator here will cause equal cost nodes to be visited in a fifo manner.
    return a.cost > b.cost ? -1 : 1;
  });
  //The node currently visited.
  let currentNode: DijkstrasInnerNode = null;
  //A boolean array used to mark visited node
  const opened: Record<string, boolean> = {};

  //Add the first node(source) to the queue.
  priQueue.add({
    identifier: fromNode,
    edgeCost: 0,
    cost: 0,
    cameFrom: null
  });

  while (!priQueue.isEmpty()) {
    //Remove the node with the shortest distance from source and visit it.
    currentNode = priQueue.remove();
    //No need to visit a node two times.
    if (opened[currentNode.identifier]) {
      continue;
    }

    //Mark as visited
    opened[currentNode.identifier] = true;

    //Check if currentNode is the goal node, the shortest path must be reached.
    if (graph.isEqual(currentNode.identifier, toNode)) {
      //Calculate the shortest path by traversing the found path backwards
      let fromNode = currentNode;
      //Add each node in the path to the return array.
      while (fromNode !== null) {
        shortestPath.push(fromNode.identifier);
        fromNode = fromNode.cameFrom;
      }
      break;
    }

    const neighbours = graph.getNeighbours(currentNode);
    //Open Neighbour nodes and put them in the priority queue if they do not exists in it
    for (let n of neighbours) {
      priQueue.add({
        //Neighbour node nr relative to currentNode
        ...n,
        //Total cost so far to currentNode + cost of the path from current to neighbour
        cost: currentNode.cost + n.edgeCost,
        //Store the reference to currentNode, used to find the path taken to this node
        cameFrom: currentNode
      });
    }
  }
  return shortestPath;
}
