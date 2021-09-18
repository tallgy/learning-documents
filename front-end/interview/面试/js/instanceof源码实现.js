function myInstanceOf(L, R) {
  //这里是判断是否为对象，不是对象直接 false
  if (typeof(L) !== 'object') return false;

  // 存储原型
  const rProto = R.prototype;
  let lProto = L.__proto__;

  while (lProto) {
    // 使用迭代进行判断
    if (lProto === rProto) return true;
    lProto = lProto.__proto__;
  }

  return false;
}