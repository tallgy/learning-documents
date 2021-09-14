// const readline = require('readline');
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });
//
// const strArr = [];
// rl.on('line', (input) => {
//   const arr = input.split(',');
//   arr[0] = arr[0].slice(1, -1);
//   strArr.push(arr[0]);
//   strArr.push(arr[1]);
//   dealStr(strArr);
//   rl.close();
// })
//
//
// function dealStr(strArr) {
//   const str = strArr[0];
//   const k = strArr[1];
//
//   for (let i = 0; i < str.length - k; i++) {
//
//   }
// }


// 定义一个动物类
function Animal (name) {
  // 属性
  this.name = name || 'Animal';
  // 实例方法
  this.sleep = function(){
    console.log(this.name + '正在睡觉！');
  }
}
// 原型方法
Animal.prototype.eat = function(food) {
  console.log(this.name + '正在吃：' + food);
};


function Cat(){
  this.age = 1;
}
Cat.prototype = new Animal();
Cat.prototype.name = 'cat';