
/**
 * randomIntegerInRange - Pseudo random number generator. Returns an integer in the range
 * from 0 to the given number range. The range goes from 0 to and including the given range number.
 * @param  {Number} range The range number
 * @return {Number}       A random number in range.
 */
export function randomIntegerInRange(range){
  var randomNum;
  randomNum = Math.random() * range;
  randomNum = Math.round(randomNum);
  return randomNum;
}
