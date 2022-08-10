/**
  Binary search algorithm implemented in JavaScript as a pure function. The array must be sorted for the algorithm to be used.
  For more information about the algorithm visit : @see{https://en.wikipedia.org/wiki/Binary_search_algorithm}
  Work in progress.
  Performance:
    Worst case: O(log(n)) + 1, where n is the number of elements in the array
    Best case:  O(1), constant time.

  @param {Object} value - The object to search for
  @param {Array} array - The array to search in.
  @return {Number} result - The index of the number, or -1 if not found

  @author Lars Erik Bratlie <lars00.brat@gmail.com>
**/
export function binarySearchFindIndex<T = any>(target: T, array: Array<T>) {
  return binarySearchInner(target, array);
}

/**
  Binary search algorithm implemented in JavaScript as a pure function. The array must be sorted for the algorithm to be used.
  For more information about the algorithm visit : @see{https://en.wikipedia.org/wiki/Binary_search_algorithm}

  Performance:
    Worst case: O(log(n)) + 1, where n is the number of elements in the array
    Best case:  O(1), constant time.

  @param {Object} value - The object to search for
  @param {Array} array - The array to search in.
  @return {Number} result - The index of the number, or -1 if not found

  @author Lars Erik Bratlie <lars00.brat@gmail.com>
**/
export function binarySearchFind<T = any>(target: T, array: Array<T>) {
  const index = binarySearchInner(target, array);
  return index > -1 ? array[index] : undefined;
}

function binarySearchInner<T = any>(target: T, array: Array<T>) {
  let low = 0;
  let high = array.length - 1;
  let middle = Math.round((high - low) / 2);
  let result = -1;

  while (high >= low) {
    if (target === array[middle]) {
      result = middle;
      break;
    } else if (target > array[middle]) {
      low = middle + 1;
      middle = low + Math.round((high - low) / 2);
    } else {
      high = middle - 1;
      middle = Math.round((high - low) / 2);
    }
  }
  return result;
}
