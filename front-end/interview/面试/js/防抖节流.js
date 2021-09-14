// 防抖
function debounce(fun, delay) {
  let timer = null;

  return function (...args) {
    timer && clearTimeout(timer);

    timer = setTimeout(() => {
      fun.apply(this, args);
    }, delay);
  }
}

// let de = debounce(fun, 30);
// de(args);



// 节流
function throttle(fun, delay) {
  let timer = false;

  return function (...args) {
    if (timer) return;

    timer = true;

    setTimeout(() => {
      fun.apply(this, args);
      timer = false;
    }, delay);
  }
}

// let th = throttle(fun, 16);
// th(args);