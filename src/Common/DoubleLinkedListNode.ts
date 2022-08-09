import Node from "./Node.js";

export default class DoubleLinkedListNode<T> extends Node<T> {
  private prev: DoubleLinkedListNode<T>;
  private next: DoubleLinkedListNode<T>;
  /**
   * constructor - Sets prev next and value for this node
   *
   * @param  {Object} value value
   * @param  {DoubleLinkedListNode} prev  previous pointer
   * @param  {DoubleLinkedListNode} next  next pointer
   * @return {Void}       nothing
   */
  constructor(
    value: T,
    prev: DoubleLinkedListNode<T>,
    next: DoubleLinkedListNode<T>
  ) {
    super(value);
    this.setPrev(prev);
    this.setNext(next);
  }

  /**
   * setPrev - sets prev element ptr
   *
   * @param prev The next node in the list
   * @return {void}      nothing
   */
  setPrev(prev: DoubleLinkedListNode<T>) {
    this.prev = prev ?? null;
  }

  /**
   * getNext - returns the next pointer
   *
   * @return s returns the next node in line.
   */
  getPrev() {
    return this.prev;
  }

  /**
   *
   * @param next
   */
  setNext(next) {
    this.next = next ?? null;
  }

  /**
   * getNext - returns the next pointer
   *
   * @return returns the next node in line.
   */
  getNext() {
    return this.next;
  }
}
