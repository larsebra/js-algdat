import ListNode from "../Common/ListNode.js"

/**
 * Class representing a single linked list. It is possible to add last, add first  and remove first.
 * Thus it can be used for a base structure in a stack or a linear queue.
 *
 * +-----+        +-----+        +-----+        +-----+
 * |     |        |     |        |     |        |     |        +----+
 * |  A  +-------->  B  +-------->  C  +-------->  D  +------->+null|
 * |     |        |     |        |     |        |     |        +----+
 * +--+--+        +-----+        +-----+        +--+--+
 *    ^                                            ^
 *    |                                            |
 * +--+--+                                      +--+--+
 * |First|                                      |Last |
 * |Ptr  |                                      |Ptr  |
 * +-----+                                      +-----+
 *
 * @todo make toString
 */
export default class LinkedList<T>{
  first:ListNode<T>
  last:ListNode<T>;
  length: number;

  constructor(){
    this.first = null;
    this.last = null;
    this.length = 0;
  }

  /**
   * Symbol.iterator - Make iterable. This is a generator used in for of loop to iterate over the collection
   *
   * @return {Object}  The list object starting at beginning and ending and list size()
   */
  *[Symbol.iterator](){
      let iter_next = this.first;
      while(iter_next !== null){
        yield iter_next.getVal();
        iter_next = iter_next.getNext();
      }
  }

  /**
   * unshift - adds element first in the list. This will push
   * all elements one step to the right.
   *
   * @param  {Object} element The element to add.
   * @return {Number}         The new size of the list
   */
  unshift(element){
    if(this.size() === 0){
      this.first = new ListNode(element, null);
      this.last = this.first;
    }
    else{
      const newFirst = new ListNode(element, this.first);
      this.first = newFirst;
    }

    this.length++;
    return this.size();
  }

  /**
   * push - Adds an element last in the list
   *
   * @param  {Object} element The element to add.
   * @return {Number}         The new size of the list
   */
  push(element){
    if(this.size() === 0){
      //Just call unshift.
      return this.unshift(element);
    }

    const newLast = new ListNode(element, null);
    this.last.setNext(newLast);
    this.last = newLast;

    this.length++;
    return this.size();
  }

  /**
   * shift - removes the first element from the list, and returns it.
   * The next element in line becomes the first element in the list.
   * Pushes the list one step to the "right".
   *
   * @return {Object}  The first object in the list.
   * @throws EmptyListError
   */
  shift(){
    if(this.isEmpty()){
      const e = new Error();
      e.name = "EmptyListError";
      e.message = "Cannot remove element, list is empty"; 
      throw e;
    }
    const prevFirst = this.first;
    this.first = prevFirst.getNext();
    prevFirst.setNext(null);//remove references.
    const returnVal = prevFirst.getVal();
    prevFirst.setVal(null); //remove references.
    this.length--;
    return returnVal;
  }

  /**
   * peekFirst - Peeks at the first element in the list and returns it.
   * This does not alter the list in any way.
   *
   * @return {Object}  The first element in the list.
   * @throws EmptyListError
   */
  peekFirst(){
    if(this.isEmpty()){
      const e = new Error();
      e.name = "EmptyListError";
      e.message = "Cannot peek, list is empty";
      throw e;
    }
    return this.first.getVal();
  }

  /**
   * peekLast - Peeks at the last element in the list and returns it.
   * This method does not alter the list in anyway
   *
   * @return {type}  description
   * @throws EmptyListError
   */
  peekLast(){
    if(this.isEmpty()){
      const e = new Error();
      e.name = "EmptyListError";
      e.message = "Cannot peek, list is empty";
      throw e;
    }
    return this.last.getVal();
  }

  /**
   * isEmpty - Check if the list is empty.
   *
   * @return {Boolean}  true if empty, else false.
   */
  isEmpty(){
    return (this.size() === 0) ? true: false;
  }

  /**
   * size - returns the number of elements in the list
   *
   * @return {Number}  number of elements in the list
   */
  size(){
    return this.length;
  }

}
