/**
  @function linearSearch

  Linear search algorithm implemented in JavaScript as a pure function. Searches the given array for the given value.
  It is an iterative implementation.
  Unlike binary search there is no assumptions made on the input array for the algorithm to work.

  For more information about the algorithm visit : @see{https://www.tutorialspoint.com/data_structures_algorithms/linear_search_algorithm.htm}

  Performance:
    Worst case: O(n), where n is the number of items in the array. This happens if the value is at the end of the array.
    Best case: O(1), this happens if the value to find is in the beginning of the array.

  @param {Object} value - The given value to search for.
  @param {Array} array - The array to search in.
  @return {Number} index -  The index of the value in the array, if the value does not excists -1 is returned.

  @author Lars Erik Bratlie <lars00.brat@gmail.com>
**/
function linearSearch<T = any>(value: T, array: Array<T>) {
  var result = -1;
  for (var x = 0; x < array.length; x++) {
    if (array[x] === value) {
      result = x;
      break;
    }
  }
  return result;
}
