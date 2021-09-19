// all 方法的实现
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






// Promise的实现
const PENDING = 'pending',
    FULFILLED = 'fulfilled',
    REJECTED = 'rejected';

function Promise(executor) {
  let _this = this;
  this.state = PENDING;
  this.value = undefined;   //resolve 的值
  this.reason = undefined;  //reject 的值

  //为了解决异步问题，参考了发布订阅者模式
  this.onFulfilled = [];    //成功的回调
  this.onRejected = [];     //失败的回调

  //修改了状态，并将值赋值了出来
  function resolve(value) {
    if (_this.state === PENDING) {
      _this.state = FULFILLED;
      _this.value = value;
      // 将then方法的执行存放于数组，然后在调用了resolve的时候再执行
      _this.onFulfilled.forEach(fn => fn(value));
    }
  }
  function reject(reason) {
    if (_this.state === REJECTED) {
      _this.state = REJECTED;
      _this.reason = reason;
      _this.onRejected.forEach(fn => fn(reason));
    }
  }

  // 执行代码
  try {
    executor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}


/**
 * 这个then没有链式调用
 * @param onFulfilled
 * @param onRejected
 */
// Promise.prototype.then = function (onFulfilled, onRejected) {
//   if(this.state === FULFILLED){
//     typeof onFulfilled === 'function' && onFulfilled(this.value)
//   }
//   if(this.state === REJECTED){
//     typeof onRejected === 'function' && onRejected(this.reason)
//   }
//   if(this.state === PENDING){
//     typeof onFulfilled === 'function' && this.onFulfilled.push(onFulfilled)
//     typeof onRejected === 'function' && this.onRejected.push(onRejected)
//   }
// };

/**
 * 带有链式调用的then方法
 * @param onFulfilled
 * @param onRejected
 */
Promise.prototype.then = function (onFulfilled, onRejected) {
  let _this = this;
  console.log(this.state);
  onFulfilled = typeof(onFulfilled)==='function' ? onFulfilled : value => value;
  onRejected = typeof(onRejected)==='function' ? onRejected : reason => throw(reason);

  let promise2 = new Promise((resolve, reject) => {
    if (this.state === FULFILLED) {
      let x = onFulfilled(_this.value);
      resolvePromise(promise2, x, resolve, reject);
    }
    if (this.state === REJECTED) {
      let x = onRejected(_this.reason);
      resolvePromise(promise2, x, resolve, reject);
    }
    if (this.state === PENDING) {
      _this.onFulfilled.push(() => {
        let x = onFulfilled(_this.value);
        resolvePromise(promise2, x, resolve, reject);
      });
      _this.onRejected.push(() => {
        let x = onRejected(_this.reason);
        resolvePromise(promise2, x, resolve, reject);
      });
    }
  });

  function resolvePromise(promise2, x, resolve, reject){
    if(promise2 === x){
      reject(new TypeError('Chaining cycle'))
    }
    if(x && typeof x === 'object' || typeof x === 'function'){
      let used;
      try {
        let then = x.then
        if(typeof then === 'function') {
          then.call(x, (y)=>{
            if (used) return;
            used = true
            resolvePromise(promise2, y, resolve, reject)
          }, (r) =>{
            if (used) return;
            used = true
            reject(r)
          })
        } else {
          if (used) return;
          used = true
          resolve(x)
        }
      } catch(e){
        if (used) return;
        used = true
        reject(e)
      }
    } else {
      resolve(x)
    }
  }

}
