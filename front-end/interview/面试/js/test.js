setImmediate(() => {
  console.log(1);
  Promise.resolve().then(() => {
    console.log(2);
  });
}, 0);
new Promise((resolve) => {
  console.log(3);
  resolve();
}).then(() => {
  console.log(4);
  setTimeout(() => {
    console.log(6);
  }, 0);
}).then(() => {
  console.log(7);
});
console.log(8);

process.nextTick(() => {
  console.log(5)
});