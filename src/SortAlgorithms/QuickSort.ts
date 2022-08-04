import swap from "../Common/Swap.js"
/**
 *       ___       _   _                   ____     _  __      ____        U  ___ u    ____       _____
 *      / " \   U |"|u| |      ___      U /"___|   |"|/ /     / __"| u      \/"_ \/ U |  _"\ u   |_ " _|
 *     | |"| |   \| |\| |     |_"_|     \| | u     | ' /     <\___ \/       | | | |  \| |_) |/     | |
 *    /| |_| |\   | |_| |      | |       | |/__  U/| . \\u    u___) |   .-,_| |_| |   |  _ <      /| |\
 *    U \__\_\u  <<\___/     U/| |\u      \____|   |_|\_\     |____/>>   \_)-\___/    |_| \_\    u |_|U
 *       \\//   (__) )(   .-,_|___|_,-.  _// \\  ,-,>> \\,-.   )(  (__)       \\      //   \\_   _// \\_
 *      (_(__)      (__)   \_)-' '-(_/  (__)(__)  \.)   (_/   (__)           (__)    (__)  (__) (__) (__)
 *
 *
 * Quicksort - Quicksort implemented as a js function. This function is not pure,
 * it changes the input array. It sorts the given array, and uses the given comparator
 * to compare the elements, what the this function returns plays a role in whether it will sorts
 * the elements in ascending or descending order.
 *
 * The comparator function should have the following form: compare(a,b), and return a number; > 0, < 0 or 0.
 * If ascending order is wanted, compare(a, b) must yield a number < 0, this will sort a to an index lower than b.
 * If descending order is wanted, compare(a, b) must yield a number > 0, this will sort a to an index higher than b.
 * If compare(a, b) returns 0, leave a and b unchanged with respect to each other, but sorted with respect to all different elements
 * compare(a, b) must always return the same value when given a specific pair of elements a and b as its two arguments.
 * If inconsistent results are returned then the sort order is undefined.
 *
 * Time complexity:
 *  -Worst case:
 *
 * @param  {Array} array         The array to sort
 * @param  {Function} comparator A comparator function used to
 * @return {void}                none
 *
 * @author Lars Erik Bratlie <lars00.brat@gmail.com>
 */
function quickSort(array, comparator){
  quicksortInternal(array, 0, array.length - 1, comparator);
}

/**
 * QuicksortInternal - The internal Quicksort function.
 *
 * @param  {Array}  array The array to sort.
 * @param  {Number} left  left boundary pointer index
 * @param  {Number} right right boundary pointer index
 * @return {none}   none
 */
function quicksortInternal(array, left, right, comparator){
  //Base case
  if((right - left) < 1){
    return;
  }

  //partition
  var left_ptr = left,
      right_ptr = right,
      pivot = left + calcPivot(left, right),
      new_pivot = partition(array, left_ptr, right_ptr, pivot, comparator);

  //Calculate partition 1 ptrs;
  var p1_left = left;
  var p1_right = new_pivot - 1;

  //Calculate partition 2 ptrs;
  var p2_left = new_pivot + 1;
  var p2_right = right;

  //Partition left and right of pivot
  quicksortInternal(array, p1_left, p1_right, comparator);//Quicksort P1
  quicksortInternal(array, p2_left, p2_right, comparator);//Quicksort P2
}

/**
 * calcPivot - Calculates pivot. It just finds the middlepoint in the
 *  range between left and right. In future it will find a more sophisticated way
 *  of finding pivot.
 *
 * @param  {Number} left  left pointer of partition.
 * @param  {Number} right right pointer of partition.
 * @return {Number}       The new pivot position.
 */

function calcPivot(left, right){
  return Math.ceil((right - left)/2);
}

/**
 * partition - Partitioning the elements between a given left boundary and a given
 * right boundary around a given pivot. It moves all elements smaller than the pivot
 * to left side of pivot, and all element larger than pivot to right of pivot. after
 * successfull completion the pivot element is sorted, and is placed in the right index
 * of the array.
 * The function is not pure, it changes the input array. It only changes the position
 * of the elements in between the left boundary and right boundary of the array.
 *
 * @param  {Array} array         The array to partitioning in.
 * @param  {Number} left         The index pointer of the left boundary
 * @param  {Number} right        The index pointer of the right boundary
 * @param  {Number} pivot_index  The index of the pivot
 * @param  {Function} comparator comparator function to compare elements
 * @return {Number}              The new position of the pivot after partitioning.
 */
function partition(array, left, right, pivot_index, comparator){
  //Partition
  var rightmost_ptr = right + 0;
  var pivot = array[pivot_index];
  while(left < right){
    while(comparator(array[left], pivot) < 0){
      left++;
    }
    while(comparator(array[right], pivot) > 0){
      right--;
    }
    swap(array, left, right);
    if(left === pivot_index){
      pivot_index = right;
      left++;
    }
    else if(right === pivot_index){
      pivot_index = left;
      right--;
    }
    else{
      left++;
      right--;
    }
  }
  return pivot_index;
}

export default quickSort;
