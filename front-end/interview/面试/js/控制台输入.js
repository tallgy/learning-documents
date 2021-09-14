// const readline = require('readline');
//
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });
//
// var inputArr = [];
// rl.on('line', function (input) {
//   inputArr = input.split(" ");
//   inputArr.forEach(function(item,index){
//     inputArr[index] = +item;// 转化为数字
//   });
//   // 下面就可以对数据进行处理......
//   console.log(inputArr);
//   inputArr = [];// 清空数组
//   rl.close();
// });
//
// rl.on('close', function() {
//   console.log('程序结束');
//   process.exit(0);
// });
//








// const readline = require('readline');
//
// let arr = [];
//
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });
//
// rl.on('line', function (input) {
//   console.log(input);
//   rl.close();
// })
//
// rl.on('close', function () {
//   process.exit();
// })




// 使用闭包

// import readline from 'readline'

function readLine() {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  let string;
  rl.on('line', (input) => {
    string = input;
    rl.close();
  })

  return new Promise((resolve, reject)  => {
    rl.on('close', () => {
      resolve(string);
    })
  })
}

async function input() {
  let n = await readLine();
  return n;
}

console.log(input());