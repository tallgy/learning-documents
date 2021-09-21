function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

let n1 = new TreeNode(1);
let n2 = new TreeNode(2);
let n3 = new TreeNode(3);
let n4 = new TreeNode(4);
let n5 = new TreeNode(5);

n1.left = n2;
n1.right = n3;
n2.left = n4;
n3.right = n5;


























/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxValue = function(grid) {
  const xLen = grid[0].length;
  const yLen = grid.length;
  const arr = new Array(yLen).fill(0).map((v) => {
    new Array(xLen).fill(0);
  });

  arr.map((v, i) => {
    return
  })

  let j = 0;
  for (let i = 0; i < xLen; ) {
    if (i === 0) {
      if (j === 0) arr[j][i] += grid[j][i];
      else {
        arr[j][i] += grid[j-1][i];
        ++j;
      }
    } else {
      if (j === 0) {
        arr[j][i] += grid[j][i-1];
        ++i;
      } else {
        if (arr[j-1][i] > arr[j][i-1]) {

        }
      }
    }
  }

};
























