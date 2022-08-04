
import { expect,describe, it,  } from "bun:test";
import { compareArray, randomArrayGenerator } from "../Common/test-tools/ArraysTools";
import bubbleSort from "./BubbleSort";
import mergeSort from "./Mergesort";
import quickSort from "./Quicksort";
import selectionSort from "./Selectionsort";

function comapratorAsc(a,b) {
  if(a < b){
    return -1;
  }
  else if(a > b){
    return 1;
  }
  else{
    return 0;
  }
}

function comparatorDsc(a,b) {
  if(a < b){
    return 1;
  }
  else if(a > b){
    return -1;
  }
  else{
    return 0;
  }
}


describe("Linear Sort Algorithms", () => {
  const numbersToSort = 5000;
  const rangeOfNumbers = 5000;
  const allowForNegativeNum = true;
  const randomArray = randomArrayGenerator(numbersToSort, rangeOfNumbers, -1, allowForNegativeNum);
  //Sorting a copy of the randomArray in descending and ascending order. Used here to sort a copy of the random array so we can check the correctnes of the other algorithms`
  const asceArray = [...randomArray].sort(comapratorAsc);
  const descArray = [...randomArray].sort(comparatorDsc);

  describe("Quicksort: Sorting " + numbersToSort + " random numbers", () => {
    it('Should sort the array elements in ascending order as runtimes Quicksort does.', () => {
      const array1 = [...randomArray];
      quickSort(array1, comapratorAsc);
      expect(compareArray(array1, asceArray)).toBe(true);
    });
    it('Should sort the array elements in descending order as runtimes Quicksort does.', () => {
      const array1 = [...randomArray];
      quickSort(array1, comparatorDsc);
      expect(compareArray(array1, descArray)).toBe(true);
    });
  });

  describe("Mergesort: Sorting " + numbersToSort + " random numbers", () => {
    it('Should sort the elements correctly in incrementing order as the runtimes sort algorithm does.', () => {
      expect(compareArray(mergeSort([...randomArray], comapratorAsc),asceArray)).toBe(true);
    });

    it('Should sort the elements correctly in descending order as the runtimes sort algorithm does.', () => {
      expect(compareArray(mergeSort([...randomArray], comparatorDsc), descArray)).toBe(true);
    });
  });

  describe('Selectionsort, ${numbersToSort} elements', () => {
    it('Should sort the elements correctly in ascending order as the runtimes sort algorithm does.', () => {
      expect(compareArray(selectionSort([...randomArray], comapratorAsc), asceArray)).toBe(true);
    });

    it('Should sort the elements correctly in descending order as the runtimes sort algorithm does.', () => {
      expect(compareArray(selectionSort([...randomArray], comparatorDsc), descArray)).toBe(true);
    });
  });

  describe(`Bubblesort, ${numbersToSort} elements`, () => {
    it('Should sort the elements correctly in ascending order as the runtimes sort algorithm does.', () => {
      expect(compareArray(bubbleSort([...randomArray], comapratorAsc), asceArray)).toBe(true)
    });

    it(`Should sort the elements correctly in descending order as the runtimes sort algorithm does.`, () => {
      expect(compareArray(bubbleSort([...randomArray], comparatorDsc), descArray)).toBe(true)
    });
  });

})