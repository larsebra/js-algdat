import Node from "./Node.js";

class ListNode<T> extends Node<T> {
  next: ListNode<T>;
  /**
   * constructor - Sets next and value for this node
   *
   * @param  {Object} value value
   * @param  {DoubleLinkedListNode} next  next pointer
   * @return {Void}       nothing
   */
  constructor(value: T, next?: ListNode<T>) {
    super(value);
    this.next = next ?? null;
  }

  /**
   * setNext - sets next element
   *
   * @param  {ListNode} next The next node in the list
   * @return {ListNode}      description
   */
  setNext(next) {
    this.next = next;
  }

  /**
   * getNext - returns the next pointer
   *
   * @return {ListNode}  returns the next node in line.
   */
  getNext() {
    return this.next;
  }
}

export default ListNode;
