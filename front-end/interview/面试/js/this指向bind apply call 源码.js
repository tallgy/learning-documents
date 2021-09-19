Function.prototype.myBind = function (ctx) {

  ctx = ctx || window;
  ctx.fn = this;
  let arg = [...arguments].slice(1);

  return function () {
    ctx.fn(...arg);

    delete ctx.fn;
  };
}

// obj.myFun.bind(db, '成都','上海')();











Function.prototype.myApply = function (ctx, arr) {
  ctx = ctx || window;

  ctx.fn = this;

  let result;
  if (!arr) {
    result = ctx.fn();
  } else {
    if (!(arr instanceof Array)) throw new Error('params must be array');
    result = ctx.fn(...arr);
  }

  delete ctx.fn;
  return result;
}








Function.prototype.myCall = function (ctx) {
  ctx = ctx || window;
  ctx.fn = this;

  let arg = [...arguments].slice(1);

  let result;
  result = ctx.fn(...arg);

  delete ctx.fn;
  return result
}

// obj.myFun.myCall(db, 'cc');







var obj = {
  name: '1',
  myFun(fm) {
    console.log(`${this.name} ------ ${fm}`);
  }
}

var db = {
  name: '2'
}



// obj.myFun.bind(db, '成都','上海')();
obj.myFun.myBind(db, '成都','上海')();
obj.myFun.myBind(db, '成都','上海').call(obj);


// obj.myFun.apply(db,['成都','上海']);
// obj.myFun.myApply(db,['成都','上海']);

// obj.myFun.call(db, 'cc', 'dd');
// obj.myFun.myCall(db, 'cc', 'dd');