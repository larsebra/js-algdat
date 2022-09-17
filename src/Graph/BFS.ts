import Queue from "src/DataStructures/Queue";

/**
 * breadthFirstSearch - This is an implementation of BFS for path finding in a given graph. It works by always visiting nodes that is
 * are closest to the source node in number of hops away, and therefore not closest in terms of path cost away.
 *
 * This implementation operates on a given 2d array of this form, the graph is assumed to be unwheightet:
 *     +----+----+----+----+----+
 *     |    |  A |  B |  C |  D |
 *     +------------------------+
 *     |  A | -1 |  X |  X |  X |
 *     +------------------------+
 *     |  B |  X | -1 |  X |  X |
 *     +------------------------+
 *     |  C |  X |  X | -1 |  X |
 *     +------------------------+
 *     |  D |  X |  X |  X | -1 |
 *     +----+----+----+----+----+
 *
 * Here A, B, C, D denotes the nodes in the graph, the letter X is a positive number and tells whether or not there is a
 * path between the nodes. In BFS  the X values are discarded and not used for other than checking if there is a path between the nodes.
 * Thus, there exists a path between nodes A and B, if X is a number > -1 in the cell [A][B], if the
 * number in the cell is negative, there is assumed that a path between the nodes does not exist.
 * Further, the graph is assumed to be directional, so each row denotes from and each column means to, so cell [C][A] means
 * there exists a directed path between C and A that goes from C to A; C ------> A.
 * The letters in the array are just for illustration purposes, the array should only contain numbers indicating whether or not there
 * is a path between the nodes.
 *
 * Implementation details:
 *  It uses a list as a queue to add neighbour nodes in. The nodes that are added first gets visited first.
 *
 *  To keep track of visited nodes it has a bolean Array with the size of the number of nodes in the graph, each index indicates
 *  whether or not the node has been visited. It is not necesarry to visit a node more than once, this is because the shortest path
 *  to every node from source are visited first.
 *
 * Time Complexity:
 *
 * Space Complexity:
 *
 * @param  {type} fromNode The start node to search from
 * @param  {type} goalNode The goal node to search for.
 * @param  {type} graph    The graph to search in given on the form described above.
 * @return {Array}           An array containing the shortest path, where the first element is the start node
 *                           and the last element is the goal node. If no path exists it will return a empty array.
 * @todo throw something
 * @author Lars Erik Bratlie <lars00.brat@gmail.com>
 */
export function breadthFirstSearch(fromNode, toNode, graph) {
  if (
    !(0 <= fromNode && fromNode < graph.length) ||
    !(0 <= toNode && toNode < graph.length)
  ) {
    const e = new Error();
    e.name = "OutOfBoundsError";
    e.message = "fromNode or toNode is out of bounds";
    throw e;
  }

  const q = new Queue();
  const visited = new Array<boolean>(graph.length).fill(false); //Array used to keep track of visited nodes.
  let currentNode = null;
  let shortestPath = []; //Array containing the shortest path

  //An constructor representing a node.
  const Node = function (nodeNr, cameFrom, NrOfHops) {
    this.nodeNr = nodeNr; //The nodeNr from the graph array.
    this.cameFrom = currentNode; //Reference to the node that opened this node, the came from node.
    this.NrOfHops = NrOfHops; //NrOfHops from source to this node.
  };

  //Add first node to queue
  q.enqueue(new Node(fromNode, null, 0));

  while (!q.isEmpty()) {
    //Dequeue next element
    currentNode = q.dequeue();

    //Allready visited by another node, that node must be a shorter path to currentNode, no need to revisit.
    if (visited[currentNode.nodeNr]) {
      continue;
    }

    //Mark as visited.
    visited[currentNode.nodeNr] = true;

    //If current node visted is goal node, the shortest path is found.
    if (currentNode.nodeNr === toNode) {
      //Calculate the shortest path by traversing the found path backwards
      let fromNode = currentNode;
      let j = fromNode.NrOfHops;
      shortestPath = new Array<number>(j);
      //Add each node in the path to the return array.
      while (fromNode !== null) {
        shortestPath[j--] = fromNode.nodeNr;
        fromNode = fromNode.cameFrom;
      }
      break;
    }

    //Open neighbour nodes and add them to the priority queue
    for (let adjacent = 0; adjacent < graph.length; adjacent++) {
      if (graph[currentNode.nodeNr][adjacent] < 0 || visited[adjacent]) {
        continue;
      }
      //Add the neighbour node to q.
      q.enqueue(
        new Node(
          adjacent, //The node number
          currentNode, //Came from
          currentNode.NrOfHops + 1 //Number of hops since beginning.
        )
      );
    }
  }

  return shortestPath;
}
