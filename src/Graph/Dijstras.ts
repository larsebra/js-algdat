import BinaryHeap from "src/Trees/BinaryHeap";

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
 * The algorithm works by always visiting the node that has the shortest distance from the start node and expanding the path in that
 * direction. When the goal node is visited, it must be the shortest path between the source and the goal.
 *
 * This implementation operates on a given 2d array of this form:
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
 * Here A, B, C, D denotes the nodes in the graph, the letter x is a number representing cost, and whether or not there is a
 * path between the nodes. If there exists a path between nodes A and B there must be a number > -1 in the cell [A][B], if the
 * number in the cell is negative, there is assumed that a path between the nodes does not exist.
 * Further, the graph is assumed to be directional, so each row denotes from and each column means to, so cell [C][A] means
 * there exists a directed path between C and A that goes from C to A with cost X; C ---X---> A.
 * The letters in the array are just for illustration purposes, the array should only contain numbers indicating cost on the
 * path between the nodes.
 *
 * Implementation details:
 *  For priority queue this implementation uses a binaryheap. If nodes with equal cost paths are added, the first node added
 *  is served first, then the second, etc.. The implementation of the binary heap is a bit slow, work is in progress to fix
 *  these issues.
 *
 *  To keep track of visited nodes it has a bolean Array with the size of the number of nodes in the graph, each index indicates
 *  whether or not the node has been visited.
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
 * @todo throw something
 * @author Lars Erik Bratlie <lars00.brat@gmail.com>
 */
export function dijkstras(fromNode, toNode, graph) {
  if (
    !(0 < fromNode && fromNode < graph.length) &&
    !(0 < toNode && toNode < graph.length)
  ) {
    //Throw something
  }
  //Return array containing numbers indicating the shortest path.
  var shortestPath = [];
  //Creating a binary heap as the priority queue.
  var priQueue = new BinaryHeap(graph.length, (a, b) => {
    //The less than operator here will cause equal cost nodes to be visited in a fifo manner.
    return a.cost < b.cost ? -1 : 1;
  });
  //The node currently visited.
  var currentNode = null;
  //A boolean array used to mark visited node
  var visited = new Array(graph.length).fill(false);
  //Add the first node(source) to the queue.
  priQueue.add({ nodeNr: fromNode, cost: 0, cameFrom: null, NrOfHops: 0 });

  while (!priQueue.isEmpty()) {
    //Remove the node with the shortest distance from source and visit it.
    currentNode = priQueue.remove();

    //No need to visit a node two times.
    //The shortest path to any node from start is visited first
    if (visited[currentNode.nodeNr]) {
      continue;
    }

    //Mark as visited
    visited[currentNode.nodeNr] = true;

    //Check if currentNode is the goal node, the shortest path must be reached.
    if (currentNode.nodeNr === toNode) {
      //Calculate the shortest path by traversing the found path backwards
      var fromNode = currentNode;
      var j = fromNode.NrOfHops;
      //Add each node in the path to the return array.
      while (fromNode !== null) {
        shortestPath[j--] = fromNode.nodeNr;
        fromNode = fromNode.cameFrom;
      }
      break;
    }

    //Open Neighbour nodes and put them in the priority queue if they do not exists in it
    for (var i = 0; i < graph.length; i++) {
      //If neighbour node has allready been visited it does not have to be visited again,
      //the shortest path to that node is allready found
      if (graph[currentNode.nodeNr][i] < 0 || visited[i]) {
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
