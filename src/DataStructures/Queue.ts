import LinkedList from "./LinkedList";
/**
 * Class representing a queue. This representation uses an LinkedList as base structure, it uses Linked Lists unshift and pop for
 * enqueueing and dequeueing. This class does not have any limitiations on how many elements there can be in the list.
 * @class
 */
export default class Queue<T = any> {
  private q: LinkedList<T>;
  /**
   * constructor - makes a array as a base structure
   */
  constructor() {
    this.q = new LinkedList<T>();
    this[Symbol.iterator] = this.q[Symbol.iterator].bind(this.q);
  }

  /**
   * enqueue - enqueues at the end of the queue
   *
   * @param  {T} item to enqueue
   * @return {number} The size of the new queue
   */
  enqueue(item: T) {
    return this.q.push(item);
  }

  /**
   * dequeue - dequeues the first item in the queue
   *
   * @return {Object}  The first object in the queue
   * @todo throw error when empty
   */
  dequeue() {
    if (this.isEmpty()) {
      var e = new Error();
      e.name = "EmptyQueueError";
      e.message = "Cannot dequeue, queue is empty";
      throw e;
    }
    return this.q.shift();
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
   * @return {T}  returns the first element in line.
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
    return this.q.size() === 0 ? true : false;
  }
}
