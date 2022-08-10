import DoubleLinkedList from "./DoubleLinkedList";
/**
 * Class representing a deque. This representation uses an DoubleLinkedList as base structure, it uses the Linked Lists
 * unshift, shift, push and pop for enqueueing and dequeueing at the ends.
 * @class
 */
export default class Deque<T = any> {
  private q: DoubleLinkedList<T>;
  /**
   * constructor - makes a array as a base structure
   */
  constructor() {
    this.q = new DoubleLinkedList<T>();
    this[Symbol.iterator] = this.q[Symbol.iterator].bind(this.q);
  }

  /**
   * pushFront - enqueues at the front of the queue
   *
   * @param  {Object} item to enqueue
   * @return {number} The size of the new queue
   */
  pushFront(item: T) {
    return this.q.unshift(item);
  }

  /**
   * pushBack - enqueues at the end of the queue
   *
   * @param  {Object} item to enqueue
   * @return {number} The size of the new queue
   */
  pushBack(item: T) {
    return this.q.push(item);
  }

  /**
   * popFront - dequeues the item in the front
   *
   * @return {Object}  The first object in the queue
   * @todo throw error when empty
   */
  popFront() {
    if (this.isEmpty()) {
      var e = new Error();
      e.name = "EmptyQueueError";
      e.message = "Cannot dequeue, queue is empty";
      throw e;
    }
    return this.q.shift();
  }

  /**
   * popBack - dequeues the item in the front
   *
   * @return {Object}  The first object in the queue
   * @todo throw error when empty
   */
  popBack() {
    if (this.isEmpty()) {
      var e = new Error();
      e.name = "EmptyQueueError";
      e.message = "Cannot dequeue, queue is empty";
      throw e;
    }
    return this.q.pop();
  }

  /**
   * peekFirst - peeks at the first element in line
   *
   * @return {Object}  returns the first element in line.
   */
  peekFirst() {
    if (this.isEmpty()) {
      var e = new Error();
      e.name = "EmptyQueueError";
      e.message = "Cannot peek, queue is empty";
      throw e;
    }
    return this.q.peekFirst();
  }

  /**
   * peekLast - peeks at the first element in line
   *
   * @return {Object}  returns the first element in line.
   */
  peekLast() {
    if (this.isEmpty()) {
      var e = new Error();
      e.name = "EmptyQueueError";
      e.message = "Cannot peek, queue is empty";
      throw e;
    }
    return this.q.peekLast();
  }

  /**
   * size - gets the size of the queue.
   *
   * @return {number}  size of the queue.
   */
  size() {
    return this.q.size();
  }

  /**
   * isEmpty - Checks if the stack is empty
   *
   * @return {Boolean} The index of the top element
   */
  isEmpty() {
    return this.q.isEmpty();
  }
}
