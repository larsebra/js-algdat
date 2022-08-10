/**
 * Class representing a ring buffer. It uses an array of a given size as its base structure.
 *
 *
 *       +-----------------------------------------------------------------------------------+
 *       |      |      |      |      |      |      |      |      |      |      |      |      |
 *       |  8   |  9   |  10  |  11  |  12  | null | null |  3   |  4   |  5   |  6   |  7   |
 *       |      |      |      |      |      |      |      |      |      |      |      |      |
 *       +-------------------------------^-------------------^-------------------------------+
 *                                       |                   |
 *                                       |                   |
 *                                    +-----+             +-----+
 *                                    |Write|             |Read |
 *                                    |hder |             |hder |
 *                                    +-----+             +-----+
 *
 * @author Lars Erik Bratlie <lars00.brat@gmail.com>
 */
export default class RingBuffer<T = any> {
  private buffer: Array<T>;
  private wHdr: number;
  private rHdr: number;
  private count: number;
  private bufferOverwrite: boolean;

  /**
   * constructor - initializes the variables used to hold the states.
   *
   * @param  {Number} size                 Sets the allowed size of the ring buffer.
   * @param  {Boolean} allowBufferOveflow  If set to true writehead can overwrite the elements that has not yet been read.
   */
  constructor(size, allowBufferOveflow) {
    this.buffer = new Array(size).fill(null);
    this.wHdr = Math.round(size / 2); //Just start in the middle
    this.rHdr = Math.round(size / 2);
    this.count = 0;
    this.bufferOverwrite = allowBufferOveflow;
  }

  /**
   * Symbol.iterator - Make iterable. This is a generator used in for of loop to iterate over the collection
   *
   * @return {Object}  The list object starting at beginning and ending and list size()
   */
  *[Symbol.iterator]() {
    let iter_next = this.rHdr;
    while (iter_next !== this.wHdr) {
      yield this.buffer[iter_next];
      iter_next++;
    }
  }

  /**
   * write - Writes an element to the current write header location. If bufferOverwrite is
   * set and buffer is full, it will just continue to write over previously written data,
   * data is therefore lost. However if bufferOverwrite is false, it will throw an error
   * when buffer is full, preventing any further writing to the buffer.
   * After element is written the write head is incremented one step.
   *
   * @param  {Object} element The element to write.
   * @return {Number}       The new number of element, if the write was sucessfull.
   * @throws {FullBufferError} if queue is full and bufferOverwrite is false.
   */
  write(element) {
    if (this.isFull() && !this.bufferOverwrite) {
      const e = new Error();
      e.name = "FullBufferError";
      e.message = "Cannot write to buffer, buffer is full";
      throw e;
    }
    this.buffer[this.wHdr] = element;
    this.incrWHdr();
    this.incrCount();
    return this.size();
  }

  /**
   * read - Reads an item from the queue and sets the value to null after reading it.
   * After successfull read it increments the read header one step.
   *
   * @return {Object}  The element in the buffer, if the read was sucessfull.
   * @throws {EmptyBufferError} if buffer is empty.
   */
  read() {
    if (this.isEmpty()) {
      const e = new Error();
      e.name = "EmptyBufferError";
      e.message = "Cannot read from buffer, buffer is empty";
      throw e;
    }
    const returnElement = this.buffer[this.rHdr];
    this.buffer[this.rHdr] = null; //Remove references. No memory leaks
    this.incrRHdr();
    this.decrCount();
    return returnElement;
  }

  /**
   * incrWHdr - Private method for incrementing the writehead.
   * Should not be called from outside this adt.
   *
   * @return {undefined}  nothing
   */
  incrWHdr() {
    this.wHdr++;
    this.wHdr = this.wHdr % this.buffer.length;
  }

  /**
   * incrRHdr - Private method for incrementing the readhead.
   * Should not be called from outside this adt.
   *
   * @return {undefined}  nothing
   */
  incrRHdr() {
    this.rHdr++;
    this.rHdr = this.rHdr % this.buffer.length;
  }

  /**
   * incrCount - Private method for incrementing the number of elements.
   * should not be used outside this adt.
   *
   * @return {undefined}  nothing
   */
  incrCount() {
    if (!this.isFull()) {
      this.count++;
    }
  }

  /**
   * decrCount - Private method for decrement the number of elements in the buffer.
   * This method should not be used from the outside of this adt.
   *
   * @return {undefined}  nothing
   */
  decrCount() {
    if (!this.isEmpty()) {
      this.count--;
    }
  }

  /**
   * peekAtRHdr - Peeks at the element pointed to by the readhead and returns it.
   * This does not alter the buffer in any way.
   *
   * @return {Object}  The element pointet to by the readhead.
   * @throws {EmptyBufferError} if the buffer is empty
   */
  peekAtRHdr() {
    if (this.isEmpty()) {
      const e = new Error();
      e.name = "EmptyBufferError";
      e.message = "Cannot peak, buffer is empty";
      throw e;
    }
    return this.buffer[this.rHdr];
  }

  /**
   * peekAtWHdr - Peeks at the element pointed to by the writehead and returns it.
   * This does not alter the buffer in any way. Since the write head always is one
   * step ahead it will point to the write head position - 1, which is the last element
   * added to the buffer.
   *
   * @return {Object}  The element pointed to by the write head.
   * @throws {EmptyBufferError} if the buffer is empty
   */
  peekAtWHdr() {
    if (this.isEmpty()) {
      const e = new Error();
      e.name = "EmptyBufferError";
      e.message = "Cannot peak, buffer is empty";
      throw e;
    }
    const index = this.wHdr === 0 ? this.buffer.length - 1 : this.wHdr - 1;
    return this.buffer[index];
  }

  /**
   * size - Gets the number of elements currently held in the buffer. That is, it
   * returns writehead - readhead, which means it returns number of elements written to
   * the buffer and not yet read.
   *
   * @return {Number}  Number of elements in the buffer
   */
  size() {
    return this.count;
  }

  /**
   * isEmpty - Checks if there are any elements in the buffer
   *
   * @return {Boolean}  true if the buffer hold no elements, false if there is any written elements that is not yet read.
   */
  isEmpty() {
    return this.count === 0 ? true : false;
  }

  /**
   * isFull - Checks if the queue is full.
   *
   * @return {Boolean} true if the queue is full, otherwise false.
   */
  isFull() {
    return this.buffer.length === this.count ? true : false;
  }
}
