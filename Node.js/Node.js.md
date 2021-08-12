# Node.js

## 	学习资源

```
深入浅出Node.js
Node.js权威指南
JavaScript标准参考教程(alpha) : http://javascript.ruanyifeng.com/
Node入门: http://www.nodebeginner.org/index-zh-cn.html
官方API文档: https://nodejs.org/dist/latest-v6.x/docs/api/
中文文档(版本比较旧，凑合看) : http://www.nodeclass.com/api/node.html
CNODE社区: http://cnodejs.org
CNODE-新手入门: http://cnodejs.org/getstart
```



## 介绍

什么是nodejs

```
JavaScript 运行时环境
既不是语言，也不是框架，它是一个平台
简单来说，可以解析和执行js代码
构建于谷歌V8引擎之上
```

浏览器中的js

```
EcmaScript
	基本语法，if，var，function，object，array
Bom
Dom
```

Node.js 中的 JavaScript

```
没有 BOM、DOM
EcmaScript 基本的 JavaScript 语言部分
在 Node 中为 JavaScript 提供了一些服务器级别的 API
	文件操作的能力
	http 服务的能力
	网络服务的构建
	网络通信
	等处理...
```

```
event-driven 事件驱动
non-blocking I/O model 非阻塞IO模型（异步）
lightweight and efficient 轻量和高效
```

```
npm
最大的开源库生态系统
绝大多数js相关的包都存在了npm上
```

`npm install jquery`

node做什么

```
web服务器后台
命令行工具
	npm(node)
	git(c)
	hexo(node)
```

```
webpack
gulp
npm
```



执行

```
node 路径/xx.js
```



## 案例

### 文件读取

```
// 浏览器中的 JavaScript 是没有文件操作的能力的
// 但是 Node 中的 JavaScript 具有文件操作的能力

// fs 是 file-system 的简写，就是文件系统的意思
// 在 Node 中如果想要进行文件操作，就必须引入 fs 这个核心模块
// 在 fs 这个核心模块中，就提供了所有的文件操作相关的 API
// 例如：fs.readFile 就是用来读取文件的

// 1. 使用 require 方法加载 fs 核心模块
var fs = require('fs')

// 2. 读取文件
//    第一个参数就是要读取的文件路径
//    第二个参数是一个回调函数
//          
//        成功
//          data 数据
//          error null
//        失败
//          data undefined没有数据
//          error 错误对象
fs.readFile('./data/a.txt', function (error, data) {
  // <Buffer 68 65 6c 6c 6f 20 6e 6f 64 65 6a 73 0d 0a>
  // 文件中存储的其实都是二进制数据 0 1
  // 这里为什么看到的不是 0 和 1 呢？原因是二进制转为 16 进制了
  // 但是无论是二进制01还是16进制，人类都不认识
  // 所以我们可以通过 toString 方法把其转为我们能认识的字符
  // console.log(data)

  // console.log(error)
  // console.log(data)

  // 在这里就可以通过判断 error 来确认是否有错误发生
  if (error) {
    console.log('读取文件失败了')
  } else {
    console.log(data.toString())
  }
})
```



写入文件

```
var fs = require('fs')

// $.ajax({
//   ...
//   success: function (data) {
    
//   }
// })

// 第一个参数：文件路径
// 第二个参数：文件内容
// 第三个参数：回调函数
//    error
//    
//    成功：
//      文件写入成功
//      error 是 null
//    失败：
//      文件写入失败
//      error 就是错误对象
fs.writeFile('./data/你好.md', '大家好，给大家介绍一下，我是Node.js', function (error) {
  // console.log('文件写入成功')
  // console.log(error)
  if (error) {
    console.log('写入失败')
  } else {
    console.log('写入成功了')
  }
})
```







# end