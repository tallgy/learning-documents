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

        // ++left;
        // --right;
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


let arr = [5, 3, 7, 6, 4, 1, 0, 2, 9, 10, 8];
console.log(firstSort(arr, 0, arr.length));



