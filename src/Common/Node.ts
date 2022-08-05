
/**
 * Class representing a node
 */
class Node<T> {
  value:T;

  constructor(value){
    this.setVal(value);
  }

  /**
   * setVal - sets the value of the node
   *
   * @param  {Object} value the value the node is representing
   * @return {void} none.
   */
  setVal(value){
    this.value = value;
  }

  /**
   * getVal - gets the value of the node
   *
   * @return {Object}  returns the value of the node
   */
  getVal(){
    return this.value;
  }
}

export default Node;
