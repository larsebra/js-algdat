/**
 *     __    __   ______   ______   ______   ______   ______   ______   ______  ______
 *    /\ "-./  \ /\  ___\ /\  == \ /\  ___\ /\  ___\ /\  ___\ /\  __ \ /\  == \/\__  _\
 *    \ \ \-./\ \\ \  __\ \ \  __< \ \ \__ \\ \  __\ \ \___  \\ \ \/\ \\ \  __<\/_/\ \/
 *     \ \_\ \ \_\\ \_____\\ \_\ \_\\ \_____\\ \_____\\/\_____\\ \_____\\ \_\ \_\ \ \_\
 *      \/_/  \/_/ \/_____/ \/_/ /_/ \/_____/ \/_____/ \/_____/ \/_____/ \/_/ /_/  \/_/
 *
 *
 * Mergesort - Mergesort implemented as a pure javascript function. It uses the given
 * comparator function to order the elements, see below for more information on the comparator function.
 * This implmentation is still a bit slow, I assume it is because of Arrays native methods push, shift, slice.
 * I will look in to this, in mean time use Quicksort.
 *
 * The comparator function should have the following form: compare(a,b), and return a number; > 0, < 0 or 0.
 * If ascending order is wanted, compare(a, b) must yield a number < 0, this will sort a to an index lower than b.
 * If descending order is wanted, compare(a, b) must yield a number > 0, this will sort a to an index higher than b.
 * If compare(a, b) returns 0, leave a and b unchanged with respect to each other, but sorted with respect to all different elements
 * compare(a, b) must always return the same value when given a specific pair of elements a and b as its two arguments.
 * If inconsistent results are returned then the sort order is undefined.
 *
 * Time complexity:
 * -Worst case: O(nlog(n))
 *
 * @param {Array} array - The array that is going to be sorted. The input array is not tampered with or changed in any way
 * @param {Function} comparator description
 * @return {Array} sortedArray - The sorted array.
 *
 * @author Lars Erik Bratlie <lars00.brat@gmail.com>
 */
function mergeSort(array, comparator){
  //Base case
  if(array.length === 1){
    return array;
  }

  //Divide
  var middle = Math.floor(array.length / 2);
  var a1 = array.slice(0, middle);
  var a2 = array.slice(middle, array.length);

  //Divide further and sort.
  var na1 = mergeSort(a1, comparator);
  var na2 = mergeSort(a2, comparator);

  //The array containing all elements from na1 and na2 sorted.
  var sortedArray = [];

  //Merge
  while((na1.length > 0) && (na2.length > 0)){
    if(comparator(na1[0], na2[0]) < 0){
      sortedArray.push(na1.shift())
    }
    else if(comparator(na1[0], na2[0]) > 0){
      sortedArray.push(na2.shift())
    }
    else{
      sortedArray.push(na2.shift())
      sortedArray.push(na1.shift())
    }
  }
  while(na1.length > 0){
    sortedArray.push(na1.shift())
  }
  while(na2.length > 0){
    sortedArray.push(na2.shift())
  }
  return sortedArray;
}

export default mergeSort;
