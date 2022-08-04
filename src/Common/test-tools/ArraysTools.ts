import { randomIntegerInRange } from "./Random";

/**
  @function compareArray

  Comparison function for testing wther two arrays are equal.

  @param {Array} array1
  @param {Array} array2
  @return {Boolean} True if the two input arrays are equal, else false.

  @author Lars Erik Bratlie <lars00.brat@gmail.com>
**/
export function compareArray(array1,array2){
  if(array1.length!=array2.length)
    return false;
  for(let i = 0; i < array1.length; i++){
    if(array1[i] != array2[i]){
        return false;
    }
  }
  return true;
}

/**
 * randomArrayGenerator - Generates an array of given size filled with random values in the given range.
 *
 * @param  {Number}  range            The range the random number should be in. Every number will be from + to given range.
 * @param  {Number}  numberOfElements The number of random numbers that should be generated, this is also the size of the array.
 * @param  {Number}  seed             description
 * @param  {Boolean} negativeNumbers  Allow negative numbers in the array.
 * @param  {Boolean} sameNumber       Allow sameNumber to occour.
 * @return {Array}                    An array filled with random numbers
 */
export function randomArrayGenerator(range, numberOfElements, seed, negativeNumbers){
  let array = new Array(numberOfElements);
  let i = 0;
  let randomNum;
  
  while(i < numberOfElements){
    randomNum = randomIntegerInRange(range);
    if(negativeNumbers){
        randomNum = (Math.round(Math.random()) === 1) ? randomNum :-1 * randomNum;
    }
    array[i] = randomNum;
    i++;
  }
  return array;
}
