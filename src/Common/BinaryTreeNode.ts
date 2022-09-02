import Node from "./Node.js";

/**
 * Class representing binary tree node.
 */
export default class BinaryTreeNode<T = any> extends Node<T> {
  leftChild: BinaryTreeNode<T>;
  rightChild: BinaryTreeNode<T>;
  leftHeight: number;
  rightHeight: number;

  constructor(value: T) {
    super(value);
    this.leftHeight = 0;
    this.rightHeight = 0;
    this.rightChild = null;
    this.leftChild = null;
  }

  /**
   * findLargestHeight - Private method for finding height of a binary tree. It just takes
   * the larger of the left child and the right child and returns it.
   *
   * @param {BinaryTreeNode} The tree to find the height of.
   * @return {Number}  The height of the given binary tree.
   */
  private findLargestHeight(root: BinaryTreeNode<T>) {
    if (
      root === null ||
      root === undefined ||
      !(root instanceof BinaryTreeNode<T>)
    ) {
      return 0;
    }
    return root.rightHeight > root.leftHeight
      ? root.rightHeight
      : root.leftHeight;
  }

  setLeftChild(node: BinaryTreeNode<T>) {
    if (!(node instanceof BinaryTreeNode<T>) && !(node == null)) {
      const e = new TypeError();
      e.message = "Expect a Binary tree node but got, " + typeof node;
      throw e;
    }

    this.leftChild = node;

    if (node == null) {
      this.setLeftHeight(0);
    } else {
      const leftHeight = this.findLargestHeight(node);
      this.setLeftHeight(leftHeight + 1);
    }

    return this.getLeftHeight();
  }

  getLeftChild() {
    return this.leftChild;
  }

  setRightChild(node: BinaryTreeNode<T>) {
    if (!(node instanceof BinaryTreeNode) && !(node == null)) {
      const e = new TypeError();
      e.message = "Expect a Binary tree node but got, " + typeof node;
      throw e;
    }

    this.rightChild = node;

    if (node == null) {
      this.setRightHeight(0);
    } else {
      const rightHeight = this.findLargestHeight(node);
      this.setRightHeight(rightHeight + 1);
    }

    return this.getRightHeight();
  }

  getRightChild() {
    return this.rightChild;
  }

  setLeftHeight(h: number) {
    this.leftHeight = h;
  }

  getLeftHeight() {
    return this.leftHeight;
  }

  setRightHeight(h: number) {
    this.rightHeight = h;
  }

  getRightHeight() {
    return this.rightHeight;
  }

  removeLeftChild() {
    const leftChild = this.leftChild;
    this.leftChild = null;
    this.setLeftHeight(0);
    return leftChild;
  }

  removeRightChild() {
    const rightChild = this.rightChild;
    this.rightChild = null;
    this.setRightHeight(0);
    return rightChild;
  }

  hasLeftChild() {
    return this.leftChild === null ? false : true;
  }

  hasRightChild() {
    return this.rightChild === null ? false : true;
  }

  hasDecendants() {
    return this.hasLeftChild() || this.hasRightChild() ? true : false;
  }
}
