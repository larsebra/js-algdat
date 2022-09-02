import { describe, expect, it } from "bun:test";
import BinaryTreeNode from "src/Common/BinaryTreeNode";
import { ComparatorType } from "src/Common/interfaces";
import AVLTree from "../AVLTree";

/**
 * Class for exposing protected methods so they can be tested
 */
class AVLTestClass<T> extends AVLTree<T> {
  constructor(comparator: ComparatorType<T>) {
    super(comparator);
  }

  public getRoot() {
    return this.root;
  }

  public popHelperPublic(root: BinaryTreeNode<T>, val: T) {
    return this.popHelper(root, val);
  }

  public rotationHelperPublic(root: BinaryTreeNode<T>) {
    return this.rotationHelper(root);
  }

  public rotateLeftPublic(root: BinaryTreeNode<T>) {
    return this.rotateLeft(root);
  }

  public rotateLeftRightPublic(root: BinaryTreeNode<T>) {
    return this.rotateLeftRight(root);
  }

  public rotateRightPublic(root: BinaryTreeNode<T>) {
    return this.rotateRight(root);
  }

  public rotateRightLeftPublic(tree: BinaryTreeNode<T>) {
    return this.rotateRightLeft(tree);
  }

  public pushHelperPublic(root: BinaryTreeNode<T>, newNode: BinaryTreeNode<T>) {
    return this.pushHelper(root, newNode);
  }

  public findNodeHelperPublic(root: BinaryTreeNode<T>, val: T) {
    return this.findNodeHelper(root, val);
  }

  public findSmallestHelperPublic(root: BinaryTreeNode<T>): BinaryTreeNode<T> {
    return this.findSmallestHelper(root);
  }

  public findLargestHelperPublic(root: BinaryTreeNode<T>): BinaryTreeNode<T> {
    return this.findLargestHelper(root);
  }
}

describe("AVLTree", function () {
  const comparator = function (a: number, b: number) {
    if (a < b) {
      return -1;
    } else if (a > b) {
      return 1;
    } else {
      return 0;
    }
  };

  /**
   * Test Public methods
   */
  const tree = new AVLTestClass(comparator);
  const compArray = [8, 3, 10, 1, 7, 14, 6];

  it("should be empty when non elements are added", () => {
    expect(tree.isEmpty()).toBe(true);
    expect(tree.size()).toBe(0);
  });

  it("push should return correct size after adding", () => {
    compArray.forEach((element, index) => {
      expect(tree.push(element)).toBe(index + 1);
    });
  });

  it("traversing the tree in ascending order correctly", () => {
    const ar = compArray.slice(0).sort(comparator);
    let index = 0;
    for (let i of tree.traverseInOrderAsc()) {
      expect(i).toBe(ar[index]);
      index++;
    }
  });

  it("traversing the tree in acending order correctly", () => {
    const ar = compArray.slice(0).sort(comparator).reverse();
    let index = 0;
    for (let i of tree.traverseInOrderDsc()) {
      expect(i).toBe(ar[index]);
      index++;
    }
  });

  it("should find the smallest of all elements", () => {
    expect(tree.findSmallest()).toBe(1);
  });

  it("should find the largest of all elements", () => {
    expect(tree.findLargest()).toBe(14);
  });

  it("should be able to search the tree and find correct element", () => {
    expect(tree.find(14)).toBe(14);
  });

  it("should be able to search the tree and find correct element", () => {
    expect(tree.find(14)).toBe(14);
  });

  it("should be able to search the tree and find correct element", () => {
    expect(tree.pop(14)).toBe(14);
  });

  it("should not be able to find removed element", () => {
    expect(tree.pop(14)).toBe(null);
  });

  it("after poping/removing an element the size shoud be correct", () => {
    expect(tree.size()).toBe(6);
  });

  it("Should find and return the biggest node", () => {
    expect(tree.push(14)).toBe(7);
    expect(tree.popBiggest()).toBe(14);
  });

  it("Should find and return the smallest node", () => {
    expect(tree.popSmallest()).toBe(1);
    expect(tree.size()).toBe(5);
  });

  it("Rigth right rotatation", function () {
    //Make a tree wich is umbalanced at the root.
    const root = new BinaryTreeNode(10);

    //Left subtree
    const lc = new BinaryTreeNode(8);
    const lclc = new BinaryTreeNode(6);
    const lcrc = new BinaryTreeNode(9);
    const lclclc = new BinaryTreeNode(3);

    //Right subtree
    const rc = new BinaryTreeNode(15);

    //Make the tree
    root.setLeftChild(lc);
    root.setRightChild(rc);

    //Make left subtree of root..
    lc.setLeftChild(lclc);
    lc.setRightChild(lcrc);
    lclc.setLeftChild(lclclc);

    const newRoot = tree.rotateRightPublic(root);

    //Test if new root is correct.
    expect(Object.is(newRoot, lc)).toBe(true);

    //Test left subtree
    expect(Object.is(newRoot.getLeftChild(), lclc)).toBe(true);
    expect(Object.is(lclc.getLeftChild(), lclclc)).toBe(true);

    //Test Right subtree
    expect(Object.is(newRoot.getRightChild(), root)).toBe(true);
    expect(Object.is(root.getLeftChild(), lcrc)).toBe(true);
  });

  it("Left left rotatation", function () {
    //Make a tree wich is umbalanced at the root.
    const root = new BinaryTreeNode(10);

    //Left subtree
    const lc = new BinaryTreeNode(8);

    //Right subtree
    const rc = new BinaryTreeNode(15);
    const rclc = new BinaryTreeNode(13);
    const rcrc = new BinaryTreeNode(17);
    const rcrcrc = new BinaryTreeNode(19);

    //Make the tree
    root.setLeftChild(lc);
    root.setRightChild(rc);

    //Make right subtree of root.
    rc.setLeftChild(rclc);
    rc.setRightChild(rcrc);
    rcrc.setRightChild(rcrcrc);

    const newRoot = tree.rotateLeftPublic(root);

    //Test root
    expect(Object.is(newRoot, rc)).toBe(true);

    //Test left subtree.
    expect(Object.is(newRoot.getLeftChild(), root)).toBe(true);
    expect(Object.is(root.getLeftChild(), lc)).toBe(true);
    expect(Object.is(root.getRightChild(), rclc)).toBe(true);

    //Test right subtree.
    expect(Object.is(newRoot.getRightChild(), rcrc)).toBe(true);
    expect(Object.is(rcrc.getRightChild(), rcrcrc)).toBe(true);
  });

  it("Simple Right left rotatation", function () {
    //Make a tree wich is umbalanced at the root.
    const root = new BinaryTreeNode(10);

    //Left subtree
    const rc = new BinaryTreeNode(15);
    const rclc = new BinaryTreeNode(13);

    //Make the tree
    root.setRightChild(rc);

    //Make left subtree of root.
    rc.setLeftChild(rclc);

    const newRoot = tree.rotateRightLeftPublic(root);

    expect(Object.is(newRoot, rclc)).toBe(true);
    expect(Object.is(newRoot.getLeftChild(), root)).toBe(true);
    expect(Object.is(newRoot.getRightChild(), rc)).toBe(true);
  });

  it("Advanced Right left rotatation", function () {
    //Make a tree wich is umbalanced at the root.
    const root = new BinaryTreeNode(10);

    //Left subtree
    const lc = new BinaryTreeNode(5);

    //Right subtree
    const rc = new BinaryTreeNode(15);
    const rclc = new BinaryTreeNode(13);
    const rcrc = new BinaryTreeNode(17);
    const rclclc = new BinaryTreeNode(11);

    //Make the tree
    root.setLeftChild(lc);
    root.setRightChild(rc);

    //Make Right subtree of root.
    rc.setLeftChild(rclc);
    rc.setRightChild(rcrc);
    rclc.setLeftChild(rclclc);

    const newRoot = tree.rotateRightLeftPublic(root);

    //Check root
    expect(Object.is(newRoot, rclc)).toBe(true);
    expect(Object.is(newRoot.getLeftChild(), root)).toBe(true);
    expect(Object.is(newRoot.getRightChild(), rc)).toBe(true);

    //Check Left subtree
    expect(Object.is(root.getLeftChild(), lc)).toBe(true);
    expect(Object.is(root.getRightChild(), rclclc)).toBe(true);

    //Check right subtree
    expect(Object.is(rc.getLeftChild(), null)).toBe(true);
    expect(Object.is(rc.getRightChild(), rcrc)).toBe(true);
  });

  it("Advanced Right left rotatation 2", function () {
    //Make a tree wich is umbalanced at the root.
    const root = new BinaryTreeNode(10);

    //Left subtree
    const lc = new BinaryTreeNode(5);

    //Right subtree
    const rc = new BinaryTreeNode(15);
    const rclc = new BinaryTreeNode(13);
    const rcrc = new BinaryTreeNode(17);
    const rclcrc = new BinaryTreeNode(14);

    //Make the tree
    root.setLeftChild(lc);
    root.setRightChild(rc);

    //Make Right subtree of root.
    rc.setLeftChild(rclc);
    rc.setRightChild(rcrc);
    rclc.setRightChild(rclcrc);

    const newRoot = tree.rotateRightLeftPublic(root);

    //Check root
    expect(Object.is(newRoot, rclc)).toBe(true);
    expect(Object.is(newRoot.getLeftChild(), root)).toBe(true);
    expect(Object.is(newRoot.getRightChild(), rc)).toBe(true);

    //Check Left subtree
    expect(Object.is(root.getLeftChild(), lc)).toBe(true);
    expect(Object.is(root.getRightChild(), null)).toBe(true);

    //Check right subtree
    expect(Object.is(rc.getLeftChild(), rclcrc)).toBe(true);
    expect(Object.is(rc.getRightChild(), rcrc)).toBe(true);
  });

  it("Simple Left right rotatation", function () {
    //Make a tree wich is umbalanced at the root.
    const root = new BinaryTreeNode(10);

    //Left subtree
    const lc = new BinaryTreeNode(5);
    const lcrc = new BinaryTreeNode(7);

    //Make the tree
    root.setLeftChild(lc);

    //Make left subtree of root.
    lc.setRightChild(lcrc);

    const newRoot = tree.rotateLeftRightPublic(root);

    expect(Object.is(newRoot, lcrc)).toBe(true);
    expect(Object.is(newRoot.getLeftChild(), lc)).toBe(true);
    expect(Object.is(newRoot.getRightChild(), root)).toBe(true);
  });

  it("Advanced Left right rotatation", function () {
    //Make a tree wich is umbalanced at the root.
    const root = new BinaryTreeNode(10);

    //Left subtree
    const lc = new BinaryTreeNode(5);
    const lclc = new BinaryTreeNode(3);
    const lcrc = new BinaryTreeNode(7);
    const lcrcrc = new BinaryTreeNode(8);

    //Right subtree
    const rc = new BinaryTreeNode(15);
    //Make the tree
    root.setLeftChild(lc);
    root.setRightChild(rc);

    //Make left subtree of root.
    lc.setLeftChild(lclc);
    lc.setRightChild(lcrc);
    lcrc.setRightChild(lcrcrc);

    const newRoot = tree.rotateLeftRightPublic(root);

    //Check if correct root has been set.
    expect(Object.is(newRoot, lcrc)).toBe(true);

    //Check left subtree
    expect(Object.is(newRoot.getLeftChild(), lc)).toBe(true);
    expect(Object.is(lc.getLeftChild(), lclc)).toBe(true);
    expect(Object.is(lc.getRightChild(), null)).toBe(true);

    //Check Right subtree
    expect(Object.is(newRoot.getRightChild(), root)).toBe(true);
    expect(Object.is(root.getLeftChild(), lcrcrc)).toBe(true);
    expect(Object.is(root.getRightChild(), rc)).toBe(true);
  });

  it("Advanced Left right rotatation 2", function () {
    //Make a tree wich is umbalanced at the root.
    const root = new BinaryTreeNode(10);

    //Left subtree
    const lc = new BinaryTreeNode(5);
    const lclc = new BinaryTreeNode(3);
    const lcrc = new BinaryTreeNode(7);
    const lcrclc = new BinaryTreeNode(6);

    //Right subtree
    const rc = new BinaryTreeNode(15);
    //Make the tree
    root.setLeftChild(lc);
    root.setRightChild(rc);

    //Make left subtree of root.
    lc.setLeftChild(lclc);
    lc.setRightChild(lcrc);
    lcrc.setLeftChild(lcrclc);

    const newRoot = tree.rotateLeftRightPublic(root);

    //Check if correct root has been set.
    expect(Object.is(newRoot, lcrc)).toBe(true);

    //Check left subtree
    expect(Object.is(newRoot.getLeftChild(), lc)).toBe(true);
    expect(Object.is(lc.getLeftChild(), lclc)).toBe(true);
    expect(Object.is(lc.getRightChild(), lcrclc)).toBe(true);

    //Check Right subtree
    expect(Object.is(newRoot.getRightChild(), root)).toBe(true);
    expect(Object.is(root.getLeftChild(), null)).toBe(true);
    expect(Object.is(root.getRightChild(), rc)).toBe(true);
  });

  it("Simple right left rotatation", function () {
    //Make a tree wich is umbalanced at the root.
    const root = new BinaryTreeNode(10);

    //Right subtree
    const rc = new BinaryTreeNode(15);
    const rclc = new BinaryTreeNode(13);

    //Make the tree
    root.setRightChild(rc);

    //Make left subtree of root.
    rc.setLeftChild(rclc);

    const newRoot = tree.rotateRightLeftPublic(root);

    expect(Object.is(newRoot, rclc)).toBe(true);
    expect(Object.is(newRoot.getRightChild(), rc)).toBe(true);
    expect(Object.is(newRoot.getLeftChild(), root)).toBe(true);
  });

  it("Advanced right left rotatation", function () {
    //Make a tree wich is umbalanced at the root.
    const root = new BinaryTreeNode(10);

    //Left subtree
    const lc = new BinaryTreeNode(5);

    //Right subtree
    const rc = new BinaryTreeNode(15);
    const rcrc = new BinaryTreeNode(17);
    const rclc = new BinaryTreeNode(13);
    const rclclc = new BinaryTreeNode(11);

    //Make the tree
    root.setLeftChild(lc);
    root.setRightChild(rc);

    //Make left subtree of root.
    rc.setLeftChild(rclc);
    rc.setRightChild(rcrc);
    rclc.setLeftChild(rclclc);

    const newRoot = tree.rotateRightLeftPublic(root);

    //Check if correct root has been set.
    expect(Object.is(newRoot, rclc)).toBe(true);

    //Check left subtree
    expect(Object.is(newRoot.getLeftChild(), root)).toBe(true);
    expect(Object.is(root.getLeftChild(), lc)).toBe(true);
    expect(Object.is(root.getRightChild(), rclclc)).toBe(true);

    //Check Right subtree
    expect(Object.is(newRoot.getRightChild(), rc)).toBe(true);
    expect(Object.is(rc.getLeftChild(), null)).toBe(true);
    expect(Object.is(rc.getRightChild(), rcrc)).toBe(true);
  });

  it("Insertion test 1 with right right rotation only", function () {
    const tree = new AVLTestClass(comparator);
    const array = [10, 5, 3];
    for (const n of array) {
      tree.push(n);
    }

    //Check length
    expect(tree.size()).toBe(3);

    //Check height
    expect(tree.getHeight()).toBe(1);

    //Checking if tree was build successfully
    expect(tree.getRoot().getVal()).toBe(5);

    //Check left tree
    expect(tree.getRoot().getLeftChild().getVal()).toBe(3);
    expect(tree.getRoot().getLeftChild().getLeftChild()).toBe(null);
    expect(tree.getRoot().getLeftChild().getRightChild()).toBe(null);
    //check right tree
    expect(tree.getRoot().getRightChild().getVal()).toBe(10);
    expect(tree.getRoot().getRightChild().getLeftChild()).toBe(null);
    expect(tree.getRoot().getRightChild().getRightChild()).toBe(null);
  });

  it("Insertion test 2 with left left rotation only", function () {
    const tree = new AVLTestClass(comparator);
    const array = [10, 15, 17];
    for (const n of array) {
      tree.push(n);
    }

    //Check length
    expect(tree.size()).toBe(3);

    //Check height
    expect(tree.getHeight()).toBe(1);

    //Checking if tree was build successfully
    expect(tree.getRoot().getVal()).toBe(15);

    //Checking Left tree
    expect(tree.getRoot().getLeftChild().getVal()).toBe(10);
    expect(tree.getRoot().getLeftChild().getLeftChild()).toBe(null);
    expect(tree.getRoot().getLeftChild().getRightChild()).toBe(null);
    //Check right tree
    expect(tree.getRoot().getRightChild().getVal()).toBe(17);
    expect(tree.getRoot().getRightChild().getLeftChild()).toBe(null);
    expect(tree.getRoot().getRightChild().getRightChild()).toBe(null);
  });

  it("Insertion test 3 with right right rotation only, but with more nodes", function () {
    const tree = new AVLTestClass(comparator);
    const array = [10, 7, 15, 5, 8, 3];
    for (const n of array) {
      tree.push(n);
    }

    //Check length
    expect(tree.size()).toBe(6);

    //Check height
    expect(tree.getHeight()).toBe(2);

    //Checking if tree was build successfully
    expect(tree.getRoot().getVal()).toBe(7);

    //Check left tree
    expect(tree.getRoot().getLeftChild().getVal()).toBe(5);
    expect(tree.getRoot().getLeftChild().getLeftChild().getVal()).toBe(3);
    expect(tree.getRoot().getLeftChild().getRightChild()).toBe(null);

    //Check right tree
    expect(tree.getRoot().getRightChild().getVal()).toBe(10);
    expect(tree.getRoot().getRightChild().getLeftChild().getVal()).toBe(8);
    expect(tree.getRoot().getRightChild().getRightChild().getVal()).toBe(15);
  });

  it("Insertion test 4 with simple left right rotation", function () {
    const tree = new AVLTestClass(comparator);
    const array = [10, 5, 7];
    for (const n of array) {
      tree.push(n);
    }

    //Check length
    expect(tree.size()).toBe(3);

    //Check height
    expect(tree.getHeight()).toBe(1);

    //Checking if tree was build successfully
    expect(tree.getRoot().getVal()).toBe(7);

    //Checking Left tree
    expect(tree.getRoot().getLeftChild().getVal()).toBe(5);
    expect(tree.getRoot().getLeftChild().getLeftChild()).toBe(null);
    expect(tree.getRoot().getLeftChild().getRightChild()).toBe(null);

    //Check right tree
    expect(tree.getRoot().getRightChild().getVal()).toBe(10);
    expect(tree.getRoot().getRightChild().getLeftChild()).toBe(null);
    expect(tree.getRoot().getRightChild().getRightChild()).toBe(null);
  });

  it("Insertion test 5 with left right rotation, but with more nodes", function () {
    const tree = new AVLTestClass(comparator);
    const array = [10, 5, 15, 3, 7, 8];
    for (const n of array) {
      tree.push(n);
    }

    //Check length
    expect(tree.size()).toBe(6);

    //Check height
    expect(tree.getHeight()).toBe(2);

    //Checking if tree was build successfully
    expect(tree.getRoot().getVal()).toBe(7);

    //Check left tree
    expect(tree.getRoot().getLeftChild().getVal()).toBe(5);
    expect(tree.getRoot().getLeftChild().getLeftChild().getVal()).toBe(3);
    expect(tree.getRoot().getLeftChild().getRightChild()).toBe(null);

    //Check right tree
    expect(tree.getRoot().getRightChild().getVal()).toBe(10);
    expect(tree.getRoot().getRightChild().getLeftChild().getVal()).toBe(8);
    expect(tree.getRoot().getRightChild().getRightChild().getVal()).toBe(15);
  });

  it("Insertion test 6 with left right rotation, same as six, but with nodes placed a bit different to test all cases.", function () {
    const tree = new AVLTestClass(comparator);
    const array = [10, 5, 15, 7, 3, 6];
    for (const n of array) {
      tree.push(n);
    }

    //Check length
    expect(tree.size()).toBe(6);

    //Check height
    expect(tree.getHeight()).toBe(2);

    //Checking if tree was build successfully
    expect(tree.getRoot().getVal()).toBe(7);

    //Check left tree
    expect(tree.getRoot().getLeftChild().getVal()).toBe(5);
    expect(tree.getRoot().getLeftChild().getLeftChild().getVal()).toBe(3);
    expect(tree.getRoot().getLeftChild().getRightChild().getVal()).toBe(6);

    //Check right tree
    expect(tree.getRoot().getRightChild().getVal()).toBe(10);
    expect(tree.getRoot().getRightChild().getLeftChild()).toBe(null);
    expect(tree.getRoot().getRightChild().getRightChild().getVal()).toBe(15);
  });

  it("Insertion test 7 with simple right left rotation", function () {
    const tree = new AVLTestClass(comparator);
    const array = [10, 15, 12];
    for (const n of array) {
      tree.push(n);
    }

    //Check length
    expect(tree.size()).toBe(3);

    //Check height
    expect(tree.getHeight()).toBe(1);

    //Checking if tree was build successfully
    expect(tree.getRoot().getVal()).toBe(12);

    //Checking Left tree
    expect(tree.getRoot().getLeftChild().getVal()).toBe(10);
    expect(tree.getRoot().getLeftChild().getLeftChild()).toBe(null);
    expect(tree.getRoot().getLeftChild().getRightChild()).toBe(null);
    //Check right tree
    expect(tree.getRoot().getRightChild().getVal()).toBe(15);
    expect(tree.getRoot().getRightChild().getLeftChild()).toBe(null);
    expect(tree.getRoot().getRightChild().getRightChild()).toBe(null);
  });

  it("Insertion test 8 with right left rotation, but with more nodes", function () {
    const tree = new AVLTestClass(comparator);
    const array = [10, 5, 15, 13, 17, 11];
    for (const n of array) {
      tree.push(n);
    }

    //Check length
    expect(tree.size()).toBe(6);

    //Check height
    expect(tree.getHeight()).toBe(2);

    //Checking if tree was build successfully
    expect(tree.getRoot().getVal()).toBe(13);

    //Checking Left tree
    expect(tree.getRoot().getLeftChild().getVal()).toBe(10);
    expect(tree.getRoot().getLeftChild().getLeftChild().getVal()).toBe(5);
    expect(tree.getRoot().getLeftChild().getRightChild().getVal()).toBe(11);
    //Check right tree
    expect(tree.getRoot().getRightChild().getVal()).toBe(15);
    expect(tree.getRoot().getRightChild().getLeftChild()).toBe(null);
    expect(tree.getRoot().getRightChild().getRightChild().getVal()).toBe(17);
  });

  it("Insertion test 9 with right left rotation, but with more nodes", function () {
    const tree = new AVLTestClass(comparator);
    const array = [10, 5, 15, 13, 17, 14];
    for (const n of array) {
      tree.push(n);
    }
    //Checking if tree was build successfully
    expect(tree.getRoot().getVal()).toBe(13);

    //Checking Left tree
    expect(tree.getRoot().getLeftChild().getVal()).toBe(10);
    expect(tree.getRoot().getLeftChild().getLeftChild().getVal()).toBe(5);
    expect(tree.getRoot().getLeftChild().getRightChild()).toBe(null);
    //Check right tree
    expect(tree.getRoot().getRightChild().getVal()).toBe(15);
    expect(tree.getRoot().getRightChild().getLeftChild().getVal()).toBe(14);
    expect(tree.getRoot().getRightChild().getRightChild().getVal()).toBe(17);
  });

  it("Testing find method", function () {
    const tree = new AVLTree(comparator);
    const array = [10, 5, 15, 13, 17, 14];
    for (const n of array) {
      tree.push(n);
    }

    //Checking if all values added could be found.
    expect(tree.find(10)).toBe(10);
    expect(tree.find(5)).toBe(5);
    expect(tree.find(13)).toBe(13);
    expect(tree.find(14)).toBe(14);
    expect(tree.find(17)).toBe(17);
    expect(tree.find(999)).toBe(null);
  });

  it("Testing find smallest method", function () {
    const tree = new AVLTree(comparator);
    const array = [10, 5, 7, 3];
    for (const n of array) {
      tree.push(n);
    }

    //Checking if smallest value is found
    expect(tree.findSmallest()).toBe(3);
    tree.push(2);
    expect(tree.findSmallest()).toBe(2);
    tree.push(1);
    expect(tree.findSmallest()).toBe(1);
    tree.push(0);
    expect(tree.findSmallest()).toBe(0);
    tree.push(-1);
    expect(tree.findSmallest()).toBe(-1);
    tree.push(11);
    expect(tree.findSmallest()).toBe(-1);
    tree.push(13);
    expect(tree.findSmallest()).toBe(-1);
  });

  it("Testing remove smallest method", function () {
    const tree = new AVLTree(comparator);
    const array = [10, 12, 3];
    for (const n of array) {
      tree.push(n);
    }

    //Checking if smallest value is found
    expect(tree.popSmallest()).toBe(3);
    expect(tree.find(3)).toBe(null);
    expect(tree.size()).toBe(2);
  });

  it("Testing remove biggest method", function () {
    const tree = new AVLTestClass(comparator);
    const array = [10, 12, 5, 3, 7, 8];
    for (const n of array) {
      tree.push(n);
    }
    expect(tree.getRoot().getVal()).toBe(7);

    expect(tree.getRoot().getLeftChild().getVal()).toBe(5);

    expect(tree.getRoot().getLeftChild().getLeftChild().getVal()).toBe(3);

    expect(tree.getRoot().getRightChild().getVal()).toBe(10);
    expect(tree.getRoot().getRightChild().getLeftChild().getVal()).toBe(8);
    expect(tree.getRoot().getRightChild().getRightChild().getVal()).toBe(12);

    //Checking if smallest value is found
    expect(tree.popBiggest()).toBe(12);
    expect(tree.find(12)).toBe(null);
    expect(tree.size()).toBe(5);
    expect(tree.getRoot().getVal()).toBe(7);

    expect(tree.popBiggest()).toBe(10);
    expect(tree.size()).toBe(4);
    expect(tree.find(10)).toBe(null);
    expect(tree.getRoot().getVal()).toBe(7);

    expect(tree.popBiggest()).toBe(8);
    expect(tree.size()).toBe(3);
    expect(tree.find(8)).toBe(null);
    expect(tree.getRoot().getVal()).toBe(5);

    expect(tree.popBiggest()).toBe(7);
    expect(tree.size()).toBe(2);
    expect(tree.find(7)).toBe(null);
    expect(tree.getRoot().getVal()).toBe(5);

    expect(tree.popBiggest()).toBe(5);
    expect(tree.size()).toBe(1);
    expect(tree.find(5)).toBe(null);
    expect(tree.getRoot().getVal()).toBe(3);

    expect(tree.popBiggest()).toBe(3);
    expect(tree.size()).toBe(0);
    expect(tree.find(3)).toBe(null);
    expect(tree.getRoot()).toBe(null);
  });

  it("Testing remove value method", function () {
    //Building the tree
    const tree = new AVLTestClass(comparator);
    const array = [10, 12, 5, 3, 7, 8];
    for (const n of array) {
      tree.push(n);
    }

    //Remove tree and check tree properties are valid after removal
    expect(tree.pop(3)).toBe(3);
    expect(tree.pop(3)).toBe(null);
    expect(tree.find(3)).toBe(null);
    expect(tree.getRoot().getVal()).toBe(7);
    expect(tree.getRoot().getLeftChild().getVal()).toBe(5);
    expect(tree.getRoot().getLeftChild().getLeftChild()).toBe(null);
    expect(tree.getRoot().getRightChild().getVal()).toBe(10);
    expect(tree.getRoot().getRightChild().getLeftChild().getVal()).toBe(8);
    expect(tree.getRoot().getRightChild().getRightChild().getVal()).toBe(12);
    expect(tree.size()).toBe(5);

    expect(tree.pop(7)).toBe(7);
    expect(tree.pop(7)).toBe(null);
    expect(tree.find(7)).toBe(null);
    expect(tree.getRoot().getVal()).toBe(8);
    expect(tree.getRoot().getLeftChild().getVal()).toBe(5);
    expect(tree.getRoot().getLeftChild().getLeftChild()).toBe(null);
    expect(tree.getRoot().getRightChild().getVal()).toBe(10);
    expect(tree.getRoot().getRightChild().getLeftChild()).toBe(null);
    expect(tree.getRoot().getRightChild().getRightChild().getVal()).toBe(12);
    expect(tree.size()).toBe(4);

    expect(tree.pop(5)).toBe(5);
    expect(tree.pop(5)).toBe(null);
    expect(tree.find(5)).toBe(null);
    expect(tree.getRoot().getVal()).toBe(10);
    expect(tree.getRoot().getLeftChild().getVal()).toBe(8);
    expect(tree.getRoot().getLeftChild().getLeftChild()).toBe(null);
    expect(tree.getRoot().getRightChild().getVal()).toBe(12);
    expect(tree.getRoot().getRightChild().getLeftChild()).toBe(null);
    expect(tree.getRoot().getRightChild().getRightChild()).toBe(null);
    expect(tree.size()).toBe(3);

    expect(tree.pop(10)).toBe(10);
    expect(tree.pop(10)).toBe(null);
    expect(tree.find(10)).toBe(null);
    expect(tree.getRoot().getVal()).toBe(8);
    expect(tree.getRoot().getLeftChild()).toBe(null);
    expect(tree.getRoot().getRightChild().getVal()).toBe(12);
    expect(tree.getRoot().getRightChild().getLeftChild()).toBe(null);
    expect(tree.getRoot().getRightChild().getRightChild()).toBe(null);
    expect(tree.size()).toBe(2);

    expect(tree.pop(8)).toBe(8);
    expect(tree.pop(8)).toBe(null);
    expect(tree.find(8)).toBe(null);
    expect(tree.getRoot().getVal()).toBe(12);
    expect(tree.getRoot().getLeftChild()).toBe(null);
    expect(tree.getRoot().getRightChild()).toBe(null);
    expect(tree.size()).toBe(1);

    expect(tree.pop(12)).toBe(12);
    //expect(() => tree.pop(12)).to.throw("Tree is empty");
    expect(tree.find(12)).toBe(null);
    expect(tree.getRoot()).toBe(null);
    expect(tree.size()).toBe(0);
  });

  // it("Test traverseInOrderAsc method and iterator", function () {
  //   //Building the tree
  //   const tree = new AVLTestClass(comparator);
  //   let array = [10, 12, 5, 3, 7, 8];
  //   for (const n of array) {
  //     tree.push(n);
  //   }
  //   array = [3, 5, 7, 8, 10, 12];
  //   const i = 0;
  //   for (const val of tree.traverseInOrderAsc()) {
  //     expect(val).toBe(array[i]);
  //     i++;
  //   }

  //   i = 0;
  //   for (const val of tree) {
  //     expect(val).toBe(array[i]);
  //     i++;
  //   }
  // });

  // it("Test traverseInOrderDsc method", function () {
  //   //Building the tree
  //   const tree = new AVLTestClass(comparator);
  //   const array = [10, 12, 5, 3, 7, 8];
  //   for (const n of array) {
  //     tree.push(n);
  //   }
  //   array = [12, 10, 8, 7, 5, 3];
  //   const i = 0;
  //   for (const val of tree.traverseInOrderDsc()) {
  //     expect(val).toBe(array[i]);
  //     i++;
  //   }
  // });
});
