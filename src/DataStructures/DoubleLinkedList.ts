import DoubleLinkedListNode from "src/Common/DoubleLinkedListNode.js";

/**
 * Class representing a circular double linked list. List index starts at 0 and goes to
 * length - 1.
 *
 * +----------------------------------------------------------+
 * |   +-----+        +-----+        +-----+        +-----+   |
 * +--->     +-------->     +-------->     +-------->     +---+
 *     |  A  |        |  B  |        |  C  |        |  D  |
 * +---+     <--------+     <--------+     <--------+     <---+
 * |   +-----+        +-----+        +-----+        +-----+   |
 * +------^--------------------------------------------^------+
 *        |                                            |
 *     +--+--+                                      +--+--+
 *     |First|                                      |Last |
 *     |Ptr  |                                      |Ptr  |
 *     +-----+                                      +-----+
 *
 * @todo make toString
 */
export default class DoubleLinkedList<T>{
  private first: DoubleLinkedListNode<T>;
  private last: DoubleLinkedListNode<T>;
  private length: number;
  /**
   * constructor - Initializes the structures, makes private
   * variables.
   *
   */
  constructor(){
    this.first = null;
    this.last = null;
    this.length = 0;
  }

  /**
   * Set symbols on object, changes the default behaviour.
   * /

  /**
   * Symbol - Make iterable. This is a generator used in for of loop to iterate over the collection
   *
   * @return {Object}  The list object starting at beginning and ending and list size()
   */
  *[Symbol.iterator](){
      let iter_next = this.first;
      do{
        yield iter_next.getVal();
        iter_next = iter_next.getNext();
      }
      while(iter_next !== this.first)
  }

  /**
   * unshift - adds element first in the list
   *
   * @param  {Object} element The element to add.
   * @return {Number}         The new size of the list
   */
  unshift(element: T){
    const newNode = new DoubleLinkedListNode<T>(element, null,null);

    if(this.size() === 0){
      //New element points to itself, if list has one element
      newNode.setNext(newNode);
      newNode.setPrev(newNode);

      //First and last references points to the first element,
      //when list has one element
      this.first = newNode;
      this.last = this.first;
    }
    else{
      //Temp var
      const prevFirst = this.first;

      //Make first pointer to point to new element.
      this.first = newNode;

      //Set references of first and last in list
      prevFirst.setPrev(newNode);
      this.last.setNext(newNode);

      //Set references of new element
      newNode.setNext(prevFirst);
      newNode.setPrev(this.last);
    }

    //Increment number of elements, and return the new size.
    this.length++;
    return this.size();
  }

  /**
   * push - Adds an element last in the list
   *
   * @param  {Object} element The element to add.
   * @return {Number}         The new size of the list
   */
  push(element: T){
    const newNode = new DoubleLinkedListNode<T>(element, null,null);

    if(this.size() === 0){
      //New element points to itself, if list has one element
      newNode.setNext(newNode);
      newNode.setPrev(newNode);

      //First and last references points to the first element,
      //when list has one element
      this.first = newNode;
      this.last = this.first;
    }
    else{
      //Temp variable
      const prevLast = this.last;

      //Make first pointer to point to new element.
      this.last = newNode;

      //Set references of first and last in list
      prevLast.setNext(newNode);
      this.first.setPrev(newNode);

      //Set references of new element
      newNode.setPrev(prevLast);
      newNode.setNext(this.first);
    }

    //Increment number of elements, and return the new size.
    this.length++;
    return this.size();
  }

  /**
   * addInPosition - Adds an element in given position. The given index
   * must be within the range of the size(), 0 =< index =< size(), otherwise
   * an error is thrown. One can add an element at last position + one in the
   * list, but it is not possible to add an element at position > one + lastindex.
   * This method does not remove any elements, rather it
   * moves the previous element at index position one step further.
   * In effect, the old element, will have position index + 1, where index is
   * the given index as parameter.
   *
   * Complexity:
   *  -Worstcase: O(n), where n is the index number
   *  -Bestcase: O(n), where n is the index number
   *  -Average: O(n), where n is the index number
   *
   * @param  {Object} element The element to add.
   * @param  {Number} index   The number
   * @return {Number}         The new size, if everything was ok.
   *
   * @throws {RangeError} if given index is out of range.
   * @throws {EmptyListError} if list is empty
   */
  addInPosition(val, index){
    if((index > 0) && this.isEmpty()){
      const e = new Error();
      e.name = "EmptyListError";
      e.message = "Cannot add element at index "+ index +", list is empty";
      throw e;
    }
    if(!((0 <= index) && (index <= this.size()))){
      const e = new RangeError();
      e.name = "IndexOutOfBoundsError";
      e.message = `Cannot add element in index ${index}, allowed range ${0 - this.size() - 1}`;
      throw e;
    }

    //If adding in the first position, just call add first
    if(index === 0){
      return this.unshift(val);
    }

    //If adding in after last position, just call add last
    if(index === this.size()){
      return this.push(val);
    }

    //Get element at index.
    const oldElementAtPos = this.getAtPosition(index);

    //Set pointer for the new element
    const newElement = new DoubleLinkedListNode(val,
                              oldElementAtPos.getPrev(),
                              oldElementAtPos);

    //Set the next reference of previous relative to new node.
    oldElementAtPos.getPrev().setNext(newElement);

    //Set pointer of the old element.
    oldElementAtPos.setPrev(newElement);

    //Increment number of elements, and return the new size.
    this.length++;
    return this.size();
  }

  /**
   * getAtPosition - Finds the element at given index position, and returns it.
   * The index values start at 0 and ends at size() - 1. It is ment to be
   * used as a private method.
   *
   * Complexity:
   *  -Worstcase: O(n), where n is the index number
   *  -Bestcase: O(n), where n is the index number
   *  -Average: O(n), where n is the index number
   *
   * @param  {Number} index The given index, must be within bounds.
   * @return {Object}       Element at given position.
   * @throws {RangeError} if given index is < 0 or > size().
   * @throws {EmptyListError} if list is empty.
   */
  getAtPosition(index){
    if(this.isEmpty()){
      const e = new Error();
      e.name = "EmptyListError";
      e.message = "Cannot remove element, list is empty";
      throw e;
    }
    if(!((0 <= index) && (index < this.size()))){
      const e = new RangeError();
      e.name = "IndexOutOfBoundsError";
      e.message = `Cannot add element in index ${index}, allowed range s 0 - ${this.size() - 1}`;
      throw e;
    }
    let nextElement = this.first;
    for(let i = 0; i < index; i++){
      nextElement = nextElement.next;
    }
    return nextElement;
  }

  /**
   * getValAtPosition - Finds the element at given position, and returns the value.
   * The index values start at 0 and ends at size() - 1.
   *
   * Complexity:
   *  -Worstcase: O(n), where n is the index number
   *  -Bestcase: O(n), where n is the index number
   *  -Average: O(n), where n is the index number
   *
   * @param  {Number} index The given index, must be within bounds.
   * @return {Object}       value at given position.
   * @throws {RangeError} if given index is < 0 or > size().
   */
  getValAtPosition(index){
    return this.getAtPosition(index).getVal();
  }

  /**
   * shift - removes the first element from the list, and returns it.
   * The next element in line becomes the first element in the list, if there
   * are any elements left.
   *
   * @return {Object}  The first object in the list.
   * @throws {EmptyListError}
   */
  shift(){
    if(this.isEmpty()){
      const e = new Error();
      e.name = "EmptyListError";
      e.message = "Cannot remove element, list is empty";
      throw e;
    }

    const prevFirst = this.first;
    const returnVal = prevFirst.getVal();

    //If one element left, just return the value and reset pointers.
    if(this.size() === 1){
      this.first = null;
      this.last = null;
    }
    else{
      //Set first to reference next element in line.
      this.first = prevFirst.getNext();

      //Change references of first and last element.
      this.first.setPrev(this.last);
      this.last.setNext(this.first);
    }

    //Remove references
    prevFirst.setNext(null);
    prevFirst.setPrev(null);

    //Decrement size and return value.
    this.length--;
    return returnVal;
  }

  /**
   * pop - removes the last element from the list, and returns it.
   * The previous element of last element becomes the new last element in
   * the list, if there are any elements left.
   *
   * @return {Object}  The last object in the list.
   * @throws {EmptyListError}
   */
  pop(){
    if(this.isEmpty()){
      const e = new Error();
      e.name = "EmptyListError";
      e.message = "Cannot remove element, list is empty";
      throw e;
    }

    //If one element left, just return the value and reset pointers.
    if(this.size() === 1){
      return this.shift();
    }

    const prevLast = this.last;
    const returnVal = prevLast.getVal();

    //Set first to reference next element in line.
    this.last = prevLast.getPrev();

    //Change references of first and last element.
    this.first.setPrev(this.last);
    this.last.setNext(this.first);

    //Remove references
    prevLast.setNext(null);
    prevLast.setPrev(null);

    //Decrement size and return value.
    this.length--;
    return returnVal;
  }

  /**
   * splice - Removes and returns the element at the given index.
   * The given index must be in the bounds of the size() of the list; 0 <= index
   * < size().
   *
   * @param  {Integer} index The index of the element to remove.
   * @return {Object}       The object to remove.
   * @throws {RangeError} If the given index is not in range.
   * @throws {EmptyListError} If list is empty
   */
  splice(index){
    if(this.isEmpty()){
      const e = new Error();
      e.name = "EmptyListError";
      e.message = "Cannot remove element, list is empty";
      throw e;
    }
    if(!((0 <= index) && (index < this.size()))){
      const e = new RangeError();
      e.name = "IndexOutOfBoundsError";
      e.message = `Cannot remove element at index  ${index} must be within bounds. Current allowed range is: 0 - ${this.size() - 1}`;
      throw e;
    }

    //If removing the first position, just call remove first
    if(index === 0){
      return this.shift();
    }

    //If removing the last position, just call remove first
    if(index === (this.size() - 1)){
      return this.pop();
    }

    //Get element at index.
    const oldElementAtPos = this.getAtPosition(index);
    const returnVal = oldElementAtPos.getVal();

    //Set the next reference of previous relative to new node.
    oldElementAtPos.getPrev().setNext(oldElementAtPos.getNext());
    oldElementAtPos.getNext().setPrev(oldElementAtPos.getPrev());

    //Remove references
    oldElementAtPos.setPrev(null);
    oldElementAtPos.setNext(null);

    //Decrement number of elements, and return the value of the old element.
    this.length--;
    return returnVal;
  }

  /**
   * peekFirst - Peeks at the first element in the list and returns it.
   *  This does not alter the list in any way.
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
