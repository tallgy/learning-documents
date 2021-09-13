// all 方法的实现
const p1 = new Promise(((resolve, reject) => {
  resolve('p1');
}));

const p2 = new Promise((resolve => {
  resolve('p2');
}))

const p3 = Promise.reject('p3');




// Promise.all([p1, p2])
//     .then((res) => {
//       console.log(res);
//     });
//
Promise.all([p1, p2, p3])
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });


let myAll = function (arr) {
  const len = arr.length;
  let flag = false;
  let arrObj = {
    resolveArr: [],
    rejectArr: []
  };

  function callback(i, resolve, reject, arrObj) {
    if (i === len-1) {
      if (flag) {
        reject(arrObj.rejectArr);
      } else {
        resolve(arrObj.resolveArr);
      }
    }
  }

  return new Promise((resolve, reject) => {
    for (let i = 0; i < arr.length; i++) {
      arr[i].then(res => {
        arrObj.resolveArr.push(res);

        callback(i, resolve, reject, arrObj);
      }).catch(err => {
        arrObj.rejectArr.push(err);
        flag = true;

        callback(i, resolve, reject, arrObj);
      })
    }
  })
}


myAll([p1, p2, p3]).then(res => {
  console.log('-------------------');
  console.log(res);
}).catch(err => {
  console.log('+++++++++++++++++++');
  console.log(err);
})