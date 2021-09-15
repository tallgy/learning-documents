// const readline = require('readline');
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });
//
// const strArr = [];
// rl.on('line', (input) => {
//   const arr = input.split(',');
//   arr[0] = arr[0].slice(1, -1);
//   strArr.push(arr[0]);
//   strArr.push(arr[1]);
//   dealStr(strArr);
//   rl.close();
// })
//
//
// function dealStr(strArr) {
//   const str = strArr[0];
//   const k = strArr[1];
//
//   for (let i = 0; i < str.length - k; i++) {
//
//   }
// }




/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function(nums) {
  let low = 0,
      high = nums.length;

  while (low <= high) {
    let mid = (low+high) >> 1;

    if (mid === nums[mid]) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return low;
};



console.log(missingNumber([0]));