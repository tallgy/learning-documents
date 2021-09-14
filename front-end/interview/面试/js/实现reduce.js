let numbers = [15.5, 2.3, 1.1, 4.7];

let fn = (pre, next) => {
  return pre + Math.round(next);
}

Array.prototype.myReduce = function (callback) {
  let arr = this;

  let result = arguments[1] || 0;
  for (let n of arr) {
    result = callback(result, n);
  }

  return result;
}

console.log(numbers.myReduce(fn, 5.5));