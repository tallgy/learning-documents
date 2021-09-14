// all 方法的实现
const p1 = new Promise(((resolve, reject) => {
  resolve('p1');
}));

const p2 = new Promise((resolve => {
  resolve('p2');
}))

const p3 = Promise.reject('p3');
const p4 = Promise.reject('p4');


// Promise.all([p1, p2])
//     .then((res) => {
//       console.log(res);
//     });
//
Promise.all([p1, p2, p3, p4])
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });


Promise.myAll = function (arr) {
  let len = arr.length;
  let resolveArr = [];

  return new Promise((resolve, reject) => {
    for (let i = 0; i < arr.length; i++) {
      Promise.resolve(arr[i]).then((res) => {
        resolveArr[i] = res;
        if (i == len-1) {
          return resolve(resolveArr);
        }
      }, (err) => {
        return reject(err);
      });
    }
  })
}









