/**
@function swap

Swaps two items in the array. This is not a pure function, this function changes the array.

@param {Array} array - The array that is going to be sorted. The input array is not tampered with or changed in anyway.
@param {Number} index1 - The first element to swap
@param {Number} index2 - The second element to swap
@return void

@author Lars Erik Bratlie <lars00.brat@gmail.com>
**/
function swap(array, index1, index2){
  if(index1 === index2){
    return;
  }
  var temp = array[index1];
  array[index1] = array[index2];
  array[index2] = temp;
}

export default swap;
