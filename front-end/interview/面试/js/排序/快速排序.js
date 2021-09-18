/**
 * 一个循环，里面两个判断，一次一次的置换
 * @param arr
 * @param begin
 * @param end
 * @returns {*}
 */
function firstSort(arr, begin, end) {
  let left = begin,
      right = end;

  let mid = arr[Math.trunc((left+right) / 2)];

  if (left >= right) return;

  while (left < right) {
    if (arr[left] >= mid) {
      if (arr[right] <= mid) {
        const cur = arr[left];
        arr[left] = arr[right];
        arr[right] = cur;
      } else {
        --right;
      }
    } else {
      ++left;
    }
  }

  firstSort(arr, begin, right - 1);
  firstSort(arr, right + 1, end);

  return arr;
}


let arr = [5, 3, 7, 6, 4, 1, 0, 2, 9, 10, 8, 12, 32, 52, 12, 2, 125 , 123, 1234, 123, 25, 5];
let begin1 = new Date();
firstSort(arr, 0, arr.length);
let end1 = new Date();
console.log(end1 - begin1);

/**
 * 循环，套循环，放置哨兵，将值一次一次赋值，赋值一次就下一次。
 * @param arr
 * @param left
 * @param right
 */
function first_sort(arr, left = 0, right = arr.length-1) {

  const sort = (arr, low, high) => {
    let pivot = arr[low];

    while (low < high) {
      while (low<high && arr[high]>=pivot) --high;
      arr[low] = arr[high];

      while (low<high && arr[low]<=pivot) ++low;
      arr[high] = arr[low];
    }
    arr[low] = pivot;

    return low;
  }

  if (left < right) {
    let index = sort(arr, left, right);

    first_sort(arr, left, index - 1);
    first_sort(arr, index + 1, right);
  }

}


let begin2 = new Date();
first_sort([5, 3, 7, 6, 4, 1, 0, 2, 9, 10, 8])
let end2 = new Date();
console.log(end2 - begin2);