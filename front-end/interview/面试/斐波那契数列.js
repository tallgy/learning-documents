// 使用循环方法
function fibonacci(n) {
  let result = 0;
  let vPro = 0;
  let vNext = 1;
  
  if (n === 1) result = vPro;
  else if (n === 2) result = vNext;
  else {
    for (let i = 3; i < n; i++) {
      const v = vPro + vNext;
      vPro = vNext;
      vNext = v;
    }
    result = vPro + vNext;
  }

  console.log(result);
  return result;
}


// 使用递归方法,非常不推荐
function fibonacci1(n) {
  if (n === 1) return 0;
  else if (n === 2) return 1;
  else return fibonacci1(n-1) + fibonacci1(n-2);
}




function getEfficiency(callback) {
  const proTime = Date.now();
  callback();
  const nextTime = Date.now();
  return nextTime - proTime;
}

console.log((getEfficiency(() => fibonacci(40))));