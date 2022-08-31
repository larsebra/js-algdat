import swap from "src/Common/Swap";

type ComparatorType<T> = (a: T, b: T) => number;
/**
 * Heap implemented with an array. It can either be a binary min heap or a binary max heap.
 * Chosing between min heap or max heap is done by passing comparator function to the constructor that returns a boolean value.
 *
 * The comparator function should have the following form: compare(a,b), and return a number; > 0, < 0 or 0.
 * If min value at root is wanted, compare(a, b) must yield a number < 0, this will move "a" higher up the tree.
 * If max value at root is wanted, compare(a, b) must yield a number > 0, this will move "a" down the tree.
 * If compare(a, b) returns 0, leave a and b unchanged with respect to each other
 * compare(a, b) must always return the same value when given a specific pair of elements a and b as its two arguments.
 * If inconsistent results are returned then the heap order is undefined.
 *
 * @class
 * @todo test class and all methods, make exceptions where it is needed
 * @todo balance the tree when adding
 */
export default class BinaryHeap<T = any> {
  private heap: Array<T>;
  private length: number;
  private comparator: ComparatorType<T>;
  /**
   * constructor - The comparator function determines if the heap is a
   * binary minimum heap or a binary maximum heap. This is done by correctly
   * returning true or false in the comparator function.
   * If max heap is wanted write a comparator function that returns 1 if a < b.
   * If min heap is wanted write a comparator function that returns -1 if a > b.
   *
   * @param  {Function} comparator function used to compare
   * @return {type}            description
   */
  constructor(size: number, comparator: ComparatorType<T>) {
    this.heap = new Array(size).fill(null);
    //Using a separate length property from the arrays class
    this.length = 0;

    //The heaps comarator function used to compare objects in the heap.
    this.comparator = comparator;
    // this[Symbol.iterator] = this.heap[Symbol.iterator].bind(this.heap);
  }

  /**
   * Symbol - Make iterable. This is a generator used in for of loop to iterate over the collection
   *
   * @return {T}  The list object starting at beginning and ending and list size()
   */
  *[Symbol.iterator]() {
    const newAr = this.heap.slice(0, this.length);
    for (let i = newAr.length; i > 0; i--) {
      const l = this.innerRemove(newAr, i);
      yield l;
    }
  }

  /**
   * add - Adds a new element to the heap.
   *
   * @param  {Node} node The node to add.
   * @return {Number}     The new size of heap.
   * @throws {FullHeapError} if heap is full.
   * @todo throw something when input is bad
   */
  add(element: T) {
    if (this.isFull()) {
      const e = new Error();
      e.name = "FullHeapError";
      e.message = "Full datastrcuture error";
      throw e;
    }

    //Put the new element last in the array and the heap.
    this.heap[this.length] = element;

    //If heap was empty just return the new length
    if (this.length === 0) {
      this.length++;
      return this.length;
    }

    //The index of the new element
    let child = this.length;

    //Get the parent of the newly added element
    let parent = this.getParentOf(child);

    //Now, swap the newly added element up til the heap property is valid again.
    while (
      parent >= 0 &&
      this.comparator(this.heap[child], this.heap[parent]) < 0
    ) {
      swap(this.heap, child, parent);
      child = parent;
      parent = this.getParentOf(child);
    }

    //Increment the size of the heap and return the new value.
    this.length++;
    return this.length;
  }

  /**
   * remove - removes the root node and restores the heap property.
   *
   * @return {Obect}  returns the root node.
   * @throws {EmptyHeapError} When heap is empty.
   */
  public remove() {
    if (this.isEmpty()) {
      const e = new Error();
      e.name = "EmptyHeapError";
      e.message = "Cannot remove root, heap is empty";
      throw e;
    }
    const root = this.innerRemove(this.heap, this.length);
    this.length--;
    return root;
  }

  private innerRemove(heap: Array<T>, length: number) {
    //Get the value of the root node and return this value at the end.
    let lastElement = length - 1;

    const rootVal = heap[0];

    //Get the last added node in the heap and put it at root for swapdown
    heap[0] = heap[lastElement];

    heap[lastElement] = null;

    let parent = 0;

    let lastIndex = lastElement - 1;
    // Swap child with highest of the two children
    while (true) {
      // Get the children of the new parent.
      let leftChild = this.getLeftChildOf(parent);
      let rightChild = this.getRightChildOf(parent);

      let swapDownChild = leftChild;
      if (leftChild > lastIndex && rightChild > lastIndex) break;
      else if (leftChild > lastIndex) swapDownChild = rightChild;
      else if (rightChild > lastIndex) swapDownChild = leftChild;
      else
        swapDownChild =
          this.comparator(heap[leftChild], heap[rightChild]) < 0
            ? leftChild
            : rightChild;
      // Check if heap property is valid.
      if (this.comparator(heap[swapDownChild], heap[parent]) < 0) {
        swap(heap, parent, swapDownChild);
        parent = swapDownChild;
        continue;
      } else break;
    }
    return rootVal;
  }

  /**
   * Currently not in use. The swap down part of the extraction method of a binary heap, implemented with recursion funcntion
   *
   * complexity: O(log(n))
   *
   * @param heap The heap
   * @param parent root at first
   * @param length number of nodes in the heap
   * @returns
   */
  private swapDown(heap: Array<T>, parent: number, length: number) {
    const leftChild = this.getLeftChildOf(parent);
    const rightChild = this.getRightChildOf(parent);
    let swapDownChild = leftChild;
    if (leftChild > length && rightChild > length) return;
    else if (leftChild > length) swapDownChild = rightChild;
    else if (rightChild > length) swapDownChild = leftChild;
    else
      swapDownChild =
        this.comparator(heap[leftChild], heap[rightChild]) < 0
          ? leftChild
          : rightChild;
    //Check if heap property is valid.
    if (this.comparator(heap[swapDownChild], heap[parent]) < 0) {
      swap(heap, parent, swapDownChild);
      return this.swapDown(heap, swapDownChild, length);
    } else return;
  }

  /**
   * getParentOf - Gets the parent index of the given index
   *
   * @param  {Number} index The child index
   * @return {Number}       The index of parent
   */
  private getParentOf(index) {
    return Math.floor((index - 1) / 2);
  }

  /**
   * getLeftChildOf - Gets the index/position of the left child of the given parent
   *
   * @param  {Number} index The index of the parent
   * @return {Number}       The index of the left child
   * @todo proove the correctnes of calculation of left child
   */
  private getLeftChildOf(index) {
    return index * 2 + 1;
  }

  /**
   * getRightChild - Gets the index/position of the right child of the given parent
   *
   * @param  {Number} index The index of the parent
   * @return {Number}       The right child.
   * @todo proove the correctnesst of the calculation of right child
   */
  private getRightChildOf(index) {
    return index * 2 + 2;
  }

  /**
   * peek - Returns the root node, but does not remove it.
   * Whether it is max or min depends on the comparator function.
   *
   * @return {type}  The root node of the heap.
   * @throw heap empty error or something when empty
   */
  peek() {
    if (this.isEmpty()) {
      const e = new Error();
      e.name = "EmptyHeapError";
      e.message = "Cannot peek at root, heap is empty";
      throw e;
    }
    return this.heap[0];
  }

  /**
   * isEmpty - description
   *
   * @return {Boolean}  return true if empty, false otherwise
   */
  isEmpty() {
    if (this.length === 0) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * isEmpty - description
   *
   * @return {Boolean}  return true if empty, false otherwise
   */
  isFull() {
    if (this.length === this.heap.length) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * size - The size of the heap
   *
   * @return {Number}  The size of the heap.
   */
  size() {
    return this.length;
  }

  /**
   * toString - Makes the whole tree readable in the console
   *
   * @return {String}  Nice string representing the heap.
   */
  toString() {
    return this.heap.toString();
  }

  /**
   * The old array is removed by pointing the heap array variable to referencing a new array,
   * if array is not referenced by outside objects, the garbage collector will remove it from memory, and there should not, be any
   * memory leakage.
   *
   * @return {void}  returns nothing
   */
  empty() {
    this.heap.fill(undefined);
    this.heap.length = 0;
    this.length = 0;
  }
}
