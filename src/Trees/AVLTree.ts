import BinaryTreeNode from "src/Common/BinaryTreeNode";
import { ComparatorType } from "src/Common/interfaces";
type PopHelperResult<T> = {
  result: BinaryTreeNode<T> | null;
  newRoot: BinaryTreeNode<T> | null;
};

/**
 *
 *                             ,--,
 *                          ,---.'|
 *   ,---,                  |   | :
 *  '  .' \            ,---.:   : |
 *  /  ;    '.         /__./||   ' :
 * :  :       \   ,---.;  ; |;   ; '
 * :  |   /\   \ /___/ \  | |'   | |__
 * |  :  ' ;.   :\   ;  \ ' ||   | :.'|
 * |  |  ;/  \   \\   \  \: |'   :    ;
 * '  :  | \  \ ,' ;   \  ' .|   |  ./
 * |  |  '  '--'    \   \   ';   : ;
 * |  :  :           \   `  ;|   ,/
 * |  | ,'            :   \ |'---'
 * `--''               '---"
 *
 * BinarSearchTree - AVL tree implemented as js class. A Binary search tree is a AVL tree iff for every node
 * the height difference of each respective nodes subtrees is only one. It uses a comparator function to compare
 * the objects that the tree concists of. See below for more details on the comparator function.
 *
 * @author Lars Erik Bratlie <lars00.brat@gmail.com>
 */
export default class AVLTree<T> {
  protected root: BinaryTreeNode | null;
  protected length: number;
  protected comparator: ComparatorType<T>;
  /**
   * constructor - Constructs a self balancing tree(AVL tree) and sets the comparator function, for more details on this
   * function see setCompareFunction below.
   *
   * @param  {Function} comparator sets the comparator used to compare objects in the tree
   */
  constructor(comparator: ComparatorType<T>) {
    this.root = null;
    this.length = 0;
    this.comparator = comparator;
  }

  /**
   * Set symbols on object, changes the default behaviour.
   * /

  /**
   * Symbol - Make iterable. This is a generator used in for of loop to iterate over the collection in order and ascending fashion.
   * It calls traverseInOrderAsc in this class, @see traverseInOrderAsc
   *
   * @yields {Object}  The type of the objects given to the tree.
   */

  [Symbol.iterator]() {
    return this.traverseInOrderAsc();
  }

  /**
   * traverseInOrderAsc - Traverses the tree in order in ascending fashion
   *
   * @return {Iterator}  returns and iterator that can be called in for of loops
   */
  traverseInOrderAsc() {
    function* traverseHelper(root) {
      if (root.hasLeftChild()) {
        yield* traverseHelper(root.getLeftChild());
      }

      yield root.getVal();

      if (root.hasRightChild()) {
        yield* traverseHelper(root.getRightChild());
      }
    }
    return traverseHelper(this.root);
  }

  /**
   * traverseInOrderDsc - Traverses the tree in order in descending fashion.
   *
   * @return {Iterator}  An iterator that can be called in for of loops.
   */
  traverseInOrderDsc() {
    function* traverseHelper(root) {
      if (root.hasRightChild()) {
        yield* traverseHelper(root.getRightChild());
      }

      yield root.getVal();

      if (root.hasLeftChild()) {
        yield* traverseHelper(root.getLeftChild());
      }
    }

    return traverseHelper(this.root);
  }

  /**
   * findSmallest - Finds The samallest value in tree.
   *
   * @return {T}  The smallest value in the tree
   */
  public findSmallest() {
    return this.findSmallestHelper(this.root).getVal();
  }

  /**
   * findaSmallestHelper - Helper method called recursively to find the smallest value in the tree
   *
   * @param  {BinaryTreeNode} root description
   * @return {BinaryTreeNode}      The smallest value in the given tree.
   */
  protected findSmallestHelper(root: BinaryTreeNode<T>): BinaryTreeNode<T> {
    let leftChild = root.getLeftChild();
    if (leftChild == null) {
      return root;
    } else {
      return this.findSmallestHelper(leftChild);
    }
  }

  /**
   * findSmallest - Finds The largest value in tree.
   *
   * @return {TemplateStringsArray}  The smallest value in the tree
   */
  public findLargest() {
    return this.findLargestHelper(this.root).getVal();
  }

  /**
   * findLargestHelper - Helper method called recursively to find the largest value in the tree
   *
   * @param  {BinaryTreeNode} root description
   * @return {BinaryTreeNode}      The smallest value in the given tree.
   */
  protected findLargestHelper(root: BinaryTreeNode<T>): BinaryTreeNode<T> {
    let rightChild = root.getRightChild();
    if (rightChild == null) {
      return root;
    } else {
      return this.findLargestHelper(rightChild);
    }
  }

  /**
   * push - Adds the given object to the tree, and rotates if necesarry, that is if
   * the AVL properties of height inbalance between right and left  subtree is broken.
   *
   * @param  {T} val The object to add
   * @return {Number}     Returns the new number of nodes in the tree
   */
  public push(val: T) {
    //If tree is empty, just add and return
    if (this.isEmpty()) {
      this.root = new BinaryTreeNode(val);
    } else {
      let nodeToAdd = new BinaryTreeNode(val);
      this.root = this.pushHelper(this.root, nodeToAdd);
    }
    this.length++;
    return this.length;
  }

  /**
   * pushHelper - private function to add a node to the tree. this method is called recursively to find the correct
   * placement of the new node, then when the recursion goes up, or the calls returns again, it checks at each step
   * if inbalance in the tree has occurred, if so it rotates.
   *
   * @param  {BinaryTreeNode} root    The root to add the new node in
   * @param  {BinaryTreeNode} newNode The node with the value to add
   * @return {BinaryTreeNode}         The new root of the tree.
   */
  protected pushHelper(root: BinaryTreeNode<T>, newNode: BinaryTreeNode<T>) {
    //Check which subtree to go down.
    //If new node is smaller than current node to add in go down left tree, but iff left subtree exists.
    if (this.comparator(newNode.getVal(), root.getVal()) <= 0) {
      //Go down left subtree if it exists
      if (root.hasLeftChild()) {
        let newLeftRoot = this.pushHelper(root.removeLeftChild(), newNode);
        root.setLeftChild(newLeftRoot); //This also sets the height
      }
      //Else just put the new node in place as left child of current node to add in
      else {
        root.setLeftChild(newNode); //This also sets the height
      }
    }
    //Else the new node must be larger, go down right subtree.
    else {
      //Go down right subtree if it exists
      if (root.hasRightChild()) {
        let newRightRoot = this.pushHelper(root.removeRightChild(), newNode);
        root.setRightChild(newRightRoot); //This also sets the height
      }
      //Else just put the new node in place as right child of current node to add in
      else {
        root.setRightChild(newNode); //This also sets the height
      }
    }

    //After adding the node, check imbalance.
    return this.rotationHelper(root);
  }

  /**
   * rotateRight - Rotate right if imbalance is in the left subtree
   * of the left child.
   *
   * @param  {BinaryTreeNode} tree the root of the subtree to rotate.
   * @return {BinaryTreeNode} the new root of the subtree;
   */
  protected rotateRight(root: BinaryTreeNode<T>) {
    //Rotate Right. This will also recalculate heights
    let newRoot = root.removeLeftChild();
    root.setLeftChild(newRoot.removeRightChild());
    newRoot.setRightChild(root);
    return newRoot;
  }

  /**
   * rotateRightLeft - Rotate right and then left  if imbalance is in the left subtree
   * of the right child.
   *
   * @param  {BinaryTreeNode} tree the root of the subtree to rotate.
   * @return {BinaryTreeNode} the new root of the subtree;
   */
  protected rotateRightLeft(tree: BinaryTreeNode<T>) {
    let rightChildRoot = this.rotateRight(tree.removeRightChild());
    tree.setRightChild(rightChildRoot);
    return this.rotateLeft(tree);
  }

  /**
   * rotateLeft - Rotate left if imbalance is in the right subtree
   * of the right child.
   *
   * @param  {BinaryTreeNode} tree the root of the subtree to rotate.
   * @return {BinaryTreeNode} the new root of the subtree;
   */
  protected rotateLeft(root: BinaryTreeNode<T>) {
    let newRoot = root.removeRightChild();
    root.setRightChild(newRoot.removeLeftChild());
    newRoot.setLeftChild(root);
    return newRoot;
  }

  /**
   * rotateLeftRight - Rotate left and then right if imbalance is in the left subtree
   * of the right child.
   *
   * @param  {BinaryTreeNode} tree the root of the subtree to rotate.
   * @return {undefined}      nothing.
   */
  protected rotateLeftRight(root: BinaryTreeNode<T>) {
    let leftChildRoot = this.rotateLeft(root.getLeftChild());
    root.setLeftChild(leftChildRoot);
    return this.rotateRight(root);
  }

  /**
   *  rotationHelper - Helper method to rotate an unbalanced tree. It checks if the tree is in inbalance,
   * if not it just returns, but if it is inbalance it rotates the tree according to the rules and returns
   * the new root.
   *
   * @param  {BinaryTreeNode} root The root to check and rotate around
   * @return {BinaryTreeNode}      The new root, after rotation(s) has been performed.
   */
  protected rotationHelper(root) {
    //This letiable contains the new root after/if rotated, otherwise current root is kept
    let newRoot = root;

    //Check if left tree has a height greater than one compared to right subtree.
    if (root.leftHeight - root.rightHeight > 1) {
      //Check what rotation that needs to be done
      if (root.leftChild.leftHeight > root.leftChild.rightHeight) {
        newRoot = this.rotateRight(root);
      } else {
        newRoot = this.rotateLeftRight(root);
      }
    }
    //Check if right tree has a height greater than one compared to the left tree.
    else if (root.rightHeight - root.leftHeight > 1) {
      //Check what rotation that needs to be done
      if (root.rightChild.rightHeight > root.rightChild.leftHeight) {
        newRoot = this.rotateLeft(root);
      } else {
        newRoot = this.rotateRightLeft(root);
      }
    }
    return newRoot;
  }

  /**
   * pop - Finds the node with the given value, removes it from the tree and returns the value.
   *
   * @param  {T} val The value to find and remove
   * @return {T | null}  The value iff found, null otherwise
   */
  pop(val: T): T | null {
    if (this.isEmpty()) {
      let e = new Error();
      e.name = "EmptyTreeError";
      e.message = "Tree is empty";
      throw e;
    }

    //Contains an object with the new root and the node with the given value. The object is on the following form: {result: BinaryTreeNode|Null, newRoot = BinaryTreeNod|Null}.
    let res = this.popHelper(this.root, val);

    //If return value from PopHelper is null, the value to search for does not exist.
    if (res.result == null) {
      return null;
    } else {
      //Node was found and removed
      this.length--;
      this.root = res.newRoot;
      return res.result.getVal();
    }
  }

  /**
   * popHelper - Locates the node with the given value, removes it and returns the node with the value. After removing
   * Tree gets balanced again by rotation if needed.
   *
   * @param  {BinaryTreeNode} root The tree to search in.
   * @param  {T} val  The given val to search for
   * @param  {BinaryTreeNode} val  An letiable to reference the removed node, if no value is given there is no way to get the removed node
   * @return {T}  An object containing the result and the new root. The object will be on the following form: {result: BinaryTreeNode|Null, newRoot = BinaryTreeNod|Null}
   *                   It is possible that the the result could be null or/and newRoot could be null.
   */
  protected popHelper(root: BinaryTreeNode<T>, val: T): PopHelperResult<T> {
    if (root == null) {
      return { result: null, newRoot: null };
    }

    let res: PopHelperResult<T>;

    //Base case; node with value is found.
    if (this.comparator(val, root.getVal()) === 0) {
      let newRoot = null;

      //First check if root has a left child. I also check if left height is bigger, I belive that can prevent rotations later. I have yet to proove this
      if (root.hasLeftChild() && root.leftHeight >= root.rightHeight) {
        //Find the largest node in the left subtree, and replace it with root.
        let res = this.popBiggestNode(root.removeLeftChild());
        newRoot = res.result;
        newRoot.setLeftChild(res.newRoot);
        newRoot.setRightChild(root.removeRightChild());
      }
      //If root has a right child and the height is bigger. I also check if left height is bigger, I belive that can prevent rotations later. I have yet to proove this
      else if (root.hasRightChild()) {
        //Find the smallest node in the right subtree and replace it with root.
        let res = this.popSmallestNode(root.removeRightChild());
        newRoot = res.result;
        newRoot.setLeftChild(root.removeLeftChild());
        newRoot.setRightChild(res.newRoot);
      }
      //If it has no children, the root is a leaf, no need to rotate
      else {
        return { result: root, newRoot: null };
      }

      //Check for inbalance, rotate and return object with result and new root.
      return { result: root, newRoot: this.rotationHelper(newRoot) };
    }
    //Go down left tree iff val is smaller
    else if (this.comparator(val, root.getVal()) <= 0) {
      //Go down left subtree if it exists
      if (root.hasLeftChild()) {
        res = this.popHelper(root.removeLeftChild(), val);
        root.setLeftChild(res.newRoot);
      } else {
        //Node with value does not exists
        return { result: null, newRoot: root };
      }
    }
    //Else the new node must be larger, go down right subtree.
    else {
      //Go down right subtree if it exists
      if (root.hasRightChild()) {
        res = this.popHelper(root.removeRightChild(), val);
        root.setRightChild(res.newRoot);
      } else {
        //Node with value does not exists
        return { result: null, newRoot: root };
      }
    }
    //Check for inbalance, rotate and return object with result and new root.
    return { result: res.result, newRoot: this.rotationHelper(root) };
  }

  /**
   * popBiggestVal - Returns and removes the biggest value in the tree.
   * Uses popBiggestNode as helper method, @see {@link AVLTree#popSmallestNode} for more information.
   *
   * @return {T}  Returns the biggest value in the tree iff it exists, null otherwise.
   * @throws {Error} When tree is empty.
   */
  public popBiggest() {
    if (this.isEmpty()) {
      let e = new Error();
      e.name = "EmptyTreeError";
      e.message = "Cannot remove biggest value, tree is empty";
      throw e;
    }

    //popBiggestNode returns an object on this form {result: BinaryTreeNode|null, newRoot = BinaryTreeNode|null}
    let res = this.popBiggestNode(this.root);

    //Getting the value from the result object
    let biggestNode = res.result;
    this.root = res.newRoot;

    //Checking the result objects
    if (biggestNode == null) {
      return null;
    } else {
      this.length--;
      return biggestNode.getVal();
    }
  }

  /**
   * popBiggestNode - Finds the node with the largest value in the given tree and returns it. The tree will be balanced after removal.
   * The function will return an object on the following form {result: BinaryTreeNode|null, newRoot = BinaryTreeNode|null}.
   *
   * @param  {BinaryTreeNode} root Root of the tree to remove the largest node from
   * @param  {BinaryTreeNode} result reference to the node with the larger value.
   * @return {Object}  An object containing the result and the new root. The object will be on the following form: {result: BinaryTreeNode|Null, newRoot = BinaryTreeNod|Null
   *                   It is possible that the the result could be null or/and newRoot could be null.
   */
  protected popBiggestNode(root: BinaryTreeNode<T>): PopHelperResult<T> {
    //If it has right child, go down that branch and check further for node with larger value
    if (root.hasRightChild()) {
      let res = this.popBiggestNode(root.removeRightChild());

      root.setRightChild(res.newRoot); //If the new right child is null, right child will be set to null and height to 0;

      //Finally return the new root or tree which is balanced with the found value if there is one.
      return { result: res.result, newRoot: this.rotationHelper(root) };
    }
    //The smallest value must be root, since it is no more right children in the tree.
    else {
      //No need to rotate left child, it should allready be balanced when adding, and it does not matter if it has no child(removeLeftChild will remove null)
      return { result: root, newRoot: root.removeLeftChild() };
    }
  }

  /**
   * popSmallestVal - Finds the smallest value in the tree, removes it from the tree, and returns the value. The tree will be balanced after removal.
   * This methiod uses popSmallestNode as helper method, @see {@link AVLTree#popSmallestNode} for more information.
   *
   * @return {T}  Returns the value with the smallest node iff the value exists in the tree, null otherwise.
   * @throws {Error}   When tree is empty.
   */
  public popSmallest() {
    if (this.isEmpty()) {
      let e = new Error();
      e.name = "EmptyTreeError";
      e.message = "Cannot remove smallest value, tree is empty";
      throw e;
    }

    //popSmallestNode returns an object on this form {result: BinaryTreeNode, newRoot = BinaryTreeNode}
    let res = this.popSmallestNode(this.root);

    //Getting the value from the result object
    let smallestNode = res.result;
    this.root = res.newRoot;

    //Checking the result objects
    if (smallestNode == null) {
      return null;
    } else {
      this.length--;
      return smallestNode.getVal();
    }
  }

  /**
   * popSmallestNode - Finds and removes the smallest node in the tree, and finally returns the
   * smallest node
   *
   * @param  {BinaryTreeNode} root Root of the tree to remove the smallest node from
   * @param  {BinaryTreeNode} result reference to the node with the smallest value.
   * @return {Object}  An object containing the result and the new root. The object will be on the following form: {result: BinaryTreeNode|Null, newRoot = BinaryTreeNod|Null
   *                   It is possible that the the result could be null or/and newRoot could be null.
   */
  protected popSmallestNode(root) {
    //If it has left child, go downs that branch and check further for node with larger value
    if (root.hasLeftChild()) {
      let result = this.popSmallestNode(root.removeLeftChild());

      root.setLeftChild(result.newRoot); //If the new right child is null, right child will be set to null and height to 0;

      //Finally return the new root or tree which is balanced with the found value if there is one.
      return { result: result.result, newRoot: this.rotationHelper(root) };
    }
    //The smallest value must be root, since it is no more right children in the tree.
    else {
      //No need to rotate right child tree, it should allready been rotated when inserting
      return { result: root, newRoot: root.removeRightChild() };
    }
  }

  /**
   * find - Uses the given comparator function, given at constructor or set by setCompare function, to
   * find the given value in the binary tree.
   *
   * @param  {T} val The given val to search for
   * @return {Object}     Null if given value does not exists, otherwise object is returned
   */
  public find(val: T) {
    let result = this.findNodeHelper(this.root, val);
    if (result == null) {
      return null;
    }
    return result.getVal();
  }

  /**
   * findNodeHelper - Searches for the given value in the given tree.
   *
   * @param  {BinaryTreeNode} root The tree to search in.
   * @param  {Object} val  The given val to search for
   * @return {Object}      Null if given value does not exists, otherwise object is returned
   */
  protected findNodeHelper(root: BinaryTreeNode<T>, val: T) {
    if (root == null) {
      return null;
    }

    //Base case; node with value is found.
    if (this.comparator(val, root.getVal()) === 0) {
      return root;
    }
    //Check which subtree to go down.
    //Go down left tree iff val is smaller
    if (this.comparator(val, root.getVal()) < 0) {
      //Go down left subtree if it exists
      if (root.hasLeftChild()) {
        return this.findNodeHelper(root.getLeftChild(), val);
      } else {
        //Node with value does not exist
        return null;
      }
    }
    //Else the new node must be larger, go down right subtree.
    else {
      //Go down right subtree if it exists
      if (root.hasRightChild()) {
        return this.findNodeHelper(root.getRightChild(), val);
      } else {
        //Node with value does not exists
        return null;
      }
    }
  }

  /**
   * getHeight - Calculates the height of the tree. The height is longest path from the root to a leaf.
   *
   * @return {Number}  The height of the tree
   */
  public getHeight() {
    return this.root.rightHeight > this.root.leftHeight
      ? this.root.rightHeight
      : this.root.leftHeight;
  }

  /**
   * isEmpty - Checks if the tree is empty or not.
   *
   * @return {Boolean}  true if empty, false otherwise.
   */
  public isEmpty() {
    return this.length === 0 ? true : false;
  }

  /**
   * size - Returns the number of nodes in the tree.
   *
   * @return {type}  The number of nodes in the tree
   */
  public size() {
    return this.length;
  }
}
