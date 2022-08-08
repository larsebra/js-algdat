
import {expect, describe, it} from "bun:test";
import RingBuffer from "./RingBuffer";
/**
 * To do: fix tests that is not supported by bun yet.
 */
describe("RingBuffer",() => {
  var bfrSize = 20;
  var b = new RingBuffer(bfrSize , false);
  var testArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
  var i = 0;

  it("Should start of empty", () =>{
    expect(b.isEmpty()).toBe(true);
    expect(b.isFull()).toBe(false);
    expect(b.size()).toBe(0);
  });

  it("Should return correct size when writing", () =>{
    for(i=0; i<bfrSize; i++){
      expect(b.write(testArray[i])).toBe(i+1);
      expect(b.size()).toBe(i+1);
    }
  });

  it("Should be iterable and loop over the expected values", () =>{
    let i = 0;
    for(let el of b){
      expect(el).toBe(testArray[i]);
      i++
    }
  });

  // it("Should throw error when trying to remove from a empty buffer", () => {
  //   expect(()=>{b.write(1)}).throw()
  // });

  it("Should be full after filling up the whole buffer", () => {
    expect(b.isEmpty()).toBe(false);
    expect(b.isFull()).toBe(true);
    expect(b.size()).toBe(bfrSize);
  });

  it("Should read the same that was written in same order", () => {
    for(i=0; i<bfrSize; i++){
      expect(b.read()).toBe(testArray[i]);
    }
  });

  it("Should be empty after removing everything", () =>{
    expect(b.isEmpty()).toBe(true);
    expect(b.isFull()).toBe(false);
    expect(b.size()).toBe(0);
  });

  // it("Should throw error when trying to remove from a empty buffer", () => {
  //   expect(()=>{b.read()}).to.throw()
  // });

  it("should peek at the right elements after writing to buffer",() => {
    for(i=0; i<bfrSize; i++){
      expect(b.write(testArray[i])).toBe(i+1);
      expect(testArray[i]).toBe(b.peekAtWHdr());
      expect(b.peekAtRHdr()).toBe(testArray[0]);
    }
  });

  it("should peek at the right elements after reading from buffer",() => {
    for(i=0; i<bfrSize; i++){
      expect(b.peekAtRHdr()).toBe(testArray[i]);
      expect(b.peekAtWHdr()).toBe(testArray[bfrSize-1]);
      expect(b.read()).toBe(testArray[i]);
    }
  });

  it("check that the correct numbers are read after writing with overflow function enabled", () =>{ 
    var overflowBuffer = new RingBuffer(bfrSize , true);
    testArray =  [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1];
    for(i=0; i<testArray.length; i++){
      expect(overflowBuffer.write(testArray[i])).toBe(overflowBuffer.size());
    }
    for(i=0; i<bfrSize; i++){
      expect(overflowBuffer.read()).toBe(testArray[Math.round(testArray.length/2) + i]);
    }
  });
});
