/**
 *     ,-.  ,--. ,    ,--.  ,-. ,---. ,  ,-.  .  .  ,-.   ,-.  ,-.  ,---.
 *    (   ` |    |    |    /      |   | /   \ |\ | (   ` /   \ |  )   |
 *     `-.  |-   |    |-   |      |   | |   | | \|  `-.  |   | |-<    |
 *    .   ) |    |    |    \      |   | \   / |  | .   ) \   / |  \   |
 *     `-'  `--' `--' `--'  `-'   '   '  `-'  '  '  `-'   `-'  '  '   '
 *
 * Selectionsort - Selectionsort implemented as a pure JavaScript function. Selection sort should not be used on
 * large collection due to its poor performance. It uses the given
 * comparator function to order the elements, see below for more information on the comparator function.
 *
 * The comparator function should have the following form: compare(a,b), and return a number; > 0, < 0 or 0.
 * If ascending order is wanted, compare(a, b) must yield a number < 0, this will sort a to an index lower than b.
 * If descending order is wanted, compare(a, b) must yield a number > 0, this will sort a to an index higher than b.
 * If compare(a, b) returns 0, leave a and b unchanged with respect to each other, but sorted with respect to all different elements
 * compare(a, b) must always return the same value when given a specific pair of elements a and b as its two arguments.
 * If inconsistent results are returned then the sort order is undefined.
 *
 * Performance:
 *  -Worst case: O(n^2)
 *
 * @param {Array} array - The array that is going to be sorted. The input array is not tampered with or changed in any way
 * @param {Function} comparator description
 * @return {Array} sortedArray - The sorted array.
 *
 * @author Lars Erik Bratlie <lars00.brat@gmail.com>
 */
function selectionSort(array, comparator){
  var sortedArray = array.slice(0);
  for(var x = 0; x < sortedArray.length - 1; x++){

    //Either the largest or the smallest value for each iteration is stored, depends on the comparator.
    var compVal = sortedArray[x];
    //The index value of the largest or smallest value.
    var compVal_index = x;

    //Find the largest or smallest value in the rest array.
    for(var y = x + 1; y < sortedArray.length; y++){
      if(comparator(compVal, sortedArray[y]) > 0){
        compVal = sortedArray[y];
        compVal_index = y;
      }
    }
    sortedArray[compVal_index] = sortedArray[x];//Swapping the elements
    sortedArray[x] = compVal;
  }
  return sortedArray;
}

export default selectionSort;
