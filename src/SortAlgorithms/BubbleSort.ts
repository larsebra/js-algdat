import swap from "../Common/Swap";
/**
 *
 *    oooooooooo              oooo       oooo       o888                                                 o8
 *     888    888 oooo  oooo   888ooooo   888ooooo   888  ooooooooo8  oooooooo8    ooooooo  oo oooooo  o888oo
 *     888oooo88   888   888   888    888 888    888 888 888oooooo8  888ooooooo  888     888 888    888 888
 *     888    888  888   888   888    888 888    888 888 888                 888 888     888 888        888
 *    o888ooo888    888o88 8o o888ooo88  o888ooo88  o888o  88oooo888 88oooooo88    88ooo88  o888o        888o
 *
 * Bubblesort - Bubblesort implemented as a pure JavaScript function. The Bubblesort should not be used on large collection
 * due to its worst case performance. It uses the given comparator function to order the elements, see below for more information
 * on the comparator function.
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
 * @author Lars Erik Bratlie <larse.bratlie@gmail.com>
 */
function bubbleSort(array, comparator){
  var sortedArray = array.slice(0);
  for(var x = sortedArray.length - 1; x > 0; x--){
    for(var y = 0; y < x; y++){
      var el1 = sortedArray[y];
      var el2 = sortedArray[y + 1];
      if(comparator(el1, el2) > 0){
        swap(sortedArray, y, y + 1)
      }
    }
  }
  return sortedArray;
}
export default bubbleSort;
