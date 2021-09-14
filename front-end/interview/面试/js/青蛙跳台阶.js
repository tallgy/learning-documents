/**
 * @param {number} n
 * @return {number}
 */
var numWays = function(n) {
  let arr = new Array(n+1);
  arr[0] = 1;
  arr[1] = 1;

  for (let i = 2; i < arr.length; i++) {
    arr[i] = (arr[i-2] + arr[i-1]) % 1000000007;
  }

  return arr[n];
};
