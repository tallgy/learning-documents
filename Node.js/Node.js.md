#  Node.js

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

## 文件读写，简单http请求和路径总结

```
# Node.js 第1天

## 上午总结

- Node.js 是什么
  + JavaScript 运行时
  + 既不是语言，也不是框架，它是一个平台
- Node.js 中的 JavaScript
  + 没有 BOM、DOM
  + EcmaScript 基本的 JavaScript 语言部分
  + 在 Node 中为 JavaScript 提供了一些服务器级别的 API
    * 文件操作的能力
    * http 服务的能力

## 总结

- Node 中的 JavaScript
  + EcmaScript
    * 变量
    * 方法
    * 数据类型
    * 内置对象
    * Array
    * Object
    * Date
    * Math
  + 模块系统
    * 在 Node 中没有全局作用域的概念
    * 在 Node 中，只能通过 require 方法来加载执行多个 JavaScript 脚本文件
    * require 加载只能是执行其中的代码，文件与文件之间由于是模块作用域，所以不会有污染的问题
      - 模块完全是封闭的
      - 外部无法访问内部
      - 内部也无法访问外部
    * 模块作用域固然带来了一些好处，可以加载执行多个文件，可以完全避免变量命名冲突污染的问题
    * 但是某些情况下，模块与模块是需要进行通信的
    * 在每个模块中，都提供了一个对象：`exports`
    * 该对象默认是一个空对象
    * 你要做的就是把需要被外部访问使用的成员手动的挂载到 `exports` 接口对象中
    * 然后谁来 `require` 这个模块，谁就可以得到模块内部的 `exports` 接口对象
    * 还有其它的一些规则，具体后面讲，以及如何在项目中去使用这种编程方式，会通过后面的案例来处理
  + 核心模块
    * 核心模块是由 Node 提供的一个个的具名的模块，它们都有自己特殊的名称标识，例如
      - fs 文件操作模块
      - http 网络服务构建模块
      - os 操作系统信息模块
      - path 路径处理模块
      - 。。。。
    * 所有核心模块在使用的时候都必须手动的先使用 `require` 方法来加载，然后才可以使用，例如：
      - `var fs = require('fs')`
- http
  + require
  + 端口号
    * ip 地址定位计算机
    * 端口号定位具体的应用程序
  + Content-Type
    * 服务器最好把每次响应的数据是什么内容类型都告诉客户端，而且要正确的告诉
    * 不同的资源对应的 Content-Type 是不一样，具体参照：http://tool.oschina.net/commons
    * 对于文本类型的数据，最好都加上编码，目的是为了防止中文解析乱码问题
  + 通过网络发送文件
    * 发送的并不是文件，本质上来讲发送是文件的内容
    * 当浏览器收到服务器响应内容之后，就会根据你的 Content-Type 进行对应的解析处理

- 模块系统
- Node 中的其它的核心模块
- 做一个小管理系统：
  + CRUD
- Express Web 开发框架
  + `npm install express`
```



## 案例

### 文件读写

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



### 简单http服务

```
// 接下来，我们要干一件使用 Node 很有成就感的一件事儿
// 你可以使用 Node 非常轻松的构建一个 Web 服务器
// 在 Node 中专门提供了一个核心模块：http
// http 这个模块的职责就是帮你创建编写服务器的

// 1. 加载 http 核心模块
var http = require('http')

// 2. 使用 http.createServer() 方法创建一个 Web 服务器
//    返回一个 Server 实例
var server = http.createServer()

// 3. 服务器要干嘛？
//    提供服务：对 数据的服务
//    发请求
//    接收请求
//    处理请求
//    给个反馈（发送响应）
//    注册 request 请求事件
//    当客户端请求过来，就会自动触发服务器的 request 请求事件，
//      然后执行第二个参数：回调处理函数
server.on('request', function () {
  console.log('收到客户端的请求了')
})

// 4. 绑定端口号，启动服务器
server.listen(3000, function () {
  console.log('服务器启动成功了，可以通过 http://127.0.0.1:3000/ 来进行访问')
})
```



### 简单处理http请求事件

```
var http = require('http')

var server = http.createServer()

// request 请求事件处理函数，需要接收两个参数：
//    Request 请求对象
//        请求对象可以用来获取客户端的一些请求信息，例如请求路径
//    Response 响应对象
//        响应对象可以用来给客户端发送响应消息
server.on('request', function (request, response) {
  // http://127.0.0.1:3000/ /
  // http://127.0.0.1:3000/a /a
  // http://127.0.0.1:3000/foo/b /foo/b
  console.log('收到客户端的请求了，请求路径是：' + request.url)

  // response 对象有一个方法：write 可以用来给客户端发送响应数据
  // write 可以使用多次，但是最后一定要使用 end 来结束响应，否则客户端会一直等待
  response.write('hello')
  response.write(' nodejs')

  // 告诉客户端，我的话说完了，你可以呈递给用户了
  response.end()

  // 由于现在我们的服务器的能力还非常的弱，无论是什么请求，都只能响应 hello nodejs
  // 思考：
  //  我希望当请求不同的路径的时候响应不同的结果
  //  例如：
  //  / index
  //  /login 登陆
  //  /register 注册
  //  /haha 哈哈哈
})

server.listen(3000, function () {
  console.log('服务器启动成功了，可以通过 http://127.0.0.1:3000/ 来进行访问')
})
```

根据不同url返回不同结果

```
进行简单的if判断即可
```

### nodejs的核心模块

```
// 用来获取机器信息的
var os = require('os')

// 用来操作路径的
var path = require('path')

// 获取当前机器的 CPU 信息
console.log(os.cpus())

// memory 内存
console.log(os.totalmem())

// 获取一个路径中的扩展名部分
// extname extension name
console.log(path.extname('c:/a/b/c/d/hello.txt'))
```

### nodejs的模块化操作

文件目录

- a.js
- b.js
- c.js

此时两个文件的作用域不同，不会相互污染，所以两个不能相互使用对方的方法和变量

```
a.js
// require 是一个方法
// 它的作用就是用来加载模块的
// 在 Node 中，模块有三种：
//    具名的核心模块，例如 fs、http
//    用户自己编写的文件模块
//      相对路径必须加 ./
//      可以省略后缀名
//      相对路径中的 ./ 不能省略，否则报错
//    在 Node 中，没有全局作用域，只有模块作用域
//      外部访问不到内部
//      内部也访问不到外部
//      默认都是封闭的
//    既然是模块作用域，那如何让模块与模块之间进行通信
//    有时候，我们加载文件模块的目的不是为了简简单单的执行里面的代码，更重要是为了使用里面的某个成员

var foo = 'aaa'

console.log('a start')

function add(x, y) {
  return x + y
}

// Error: Cannot find module 'b'
// require('b')

// 可以
// require('./b.js')

// 推荐：可以省略后缀名
require('./b')

console.log('a end')

console.log('foo 的值是：', foo)
```

```
b.js
console.log('b start')

// console.log(add(10, 20))

var foo = 'bbb'

require('./c.js')
console.log('b end')
```

```
c.js
console.log('ccc')
```

### 模块化的加载与导出

```
a.js

// require 方法有两个作用：
//    1. 加载文件模块并执行里面的代码
//    2. 拿到被加载文件模块导出的接口对象
//    
//    在每个文件模块中都提供了一个对象：exports
//    exports 默认是一个空对象
//    你要做的就是把所有需要被外部访问的成员挂载到这个 exports 对象中
var bExports = require('./b')
var fs = require('fs')

console.log(bExports.foo)

console.log(bExports.add(10, 30))

console.log(bExports.age)

bExports.readFile('./a.js')

fs.readFile('./a.js', function (err, data) {
  if (err) {
    console.log('读取文件失败')
  } else {
    console.log(data.toString())
  }
})
```

```
b.js

var foo = 'bbb'

// console.log(exports)

exports.foo = 'hello'

exports.add = function (x, y) {
  return x + y
}

exports.readFile = function (path, callback) {
  console.log('文件路径：', path)
}

var age = 18

exports.age = age

function add(x, y) {
  return x - y
}
```

### 获取客户端的IP地址和端口号

```
// ip 地址用来定位计算机
// 端口号用来定位具体的应用程序
// 所有需要联网通信的应用程序都会占用一个端口号

var http = require('http')

var server = http.createServer()

// 2. 监听 request 请求事件，设置请求处理函数
server.on('request', function (req, res) {
  console.log('收到请求了，请求路径是：' + req.url)
  console.log('请求我的客户端的地址是：', req.socket.remoteAddress, req.socket.remotePort)

  res.end('hello nodejs')
})

server.listen(5000, function () {
  console.log('服务器启动成功，可以访问了。。。')
})
```

### 设置编码头

避免出现中文乱码

text/plain	是普通文本

text/html	是html文本

```
// require
// 端口号

var http = require('http')

var server = http.createServer()

server.on('request', function (req, res) {
  // 在服务端默认发送的数据，其实是 utf8 编码的内容
  // 但是浏览器不知道你是 utf8 编码的内容
  // 浏览器在不知道服务器响应内容的编码的情况下会按照当前操作系统的默认编码去解析
  // 中文操作系统默认是 gbk
  // 解决方法就是正确的告诉浏览器我给你发送的内容是什么编码的
  // 在 http 协议中，Content-Type 就是用来告知对方我给你发送的数据内容是什么类型
  // res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  // res.end('hello 世界')

  var url = req.url

  if (url === '/plain') {
    // text/plain 就是普通文本
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    res.end('hello 世界')
  } else if (url === '/html') {
    // 如果你发送的是 html 格式的字符串，则也要告诉浏览器我给你发送是 text/html 格式的内容
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.end('<p>hello html <a href="">点我</a></p>')
  }
})

server.listen(3000, function () {
  console.log('Server is running...')
})
```

### http请求进行文件读取

```
// 1. 结合 fs 发送文件中的数据
// 2. Content-Type
//    http://tool.oschina.net/commons
//    不同的资源对应的 Content-Type 是不一样的
//    图片不需要指定编码
//    一般只为字符数据才指定编码

var http = require('http')
var fs = require('fs')

var server = http.createServer()

server.on('request', function (req, res) {
  // / index.html
  var url = req.url

  if (url === '/') {
    // 肯定不这么干
    // res.end('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Document</title></head><body><h1>首页</h1></body>/html>')

    // 我们要发送的还是在文件中的内容
    fs.readFile('./resource/index.html', function (err, data) {
      if (err) {
        res.setHeader('Content-Type', 'text/plain; charset=utf-8')
        res.end('文件读取失败，请稍后重试！')
      } else {
        // data 默认是二进制数据，可以通过 .toString 转为咱们能识别的字符串
        // res.end() 支持两种数据类型，一种是二进制，一种是字符串
        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        res.end(data)
      }
    })
  } else if (url === '/xiaoming') {
    // url：统一资源定位符
    // 一个 url 最终其实是要对应到一个资源的
    fs.readFile('./resource/ab2.jpg', function (err, data) {
      if (err) {
        res.setHeader('Content-Type', 'text/plain; charset=utf-8')
        res.end('文件读取失败，请稍后重试！')
      } else {
        // data 默认是二进制数据，可以通过 .toString 转为咱们能识别的字符串
        // res.end() 支持两种数据类型，一种是二进制，一种是字符串
        // 图片就不需要指定编码了，因为我们常说的编码一般指的是：字符编码
        res.setHeader('Content-Type', 'image/jpeg')
        res.end(data)
      }
    })
  }
})

server.listen(3000, function () {
  console.log('Server is running...')
})
```

### 使用url输入去本地读取对应url的文件并显示

```
var http = require('http')
var fs = require('fs')

var server = http.createServer()

var wwwDir = 'D:/Movie/www'

server.on('request', function (req, res) {
  var url = req.url
  // / index.html
  // /a.txt wwwDir + /a.txt
  // /apple/login.html wwwDir + /apple/login.html
  // /img/ab1.jpg wwwDir + /img/ab1.jpg
  
  var filePath = '/index.html'
  if (url !== '/') {
    filePath = url
  }

  fs.readFile(wwwDir + filePath, function (err, data) {
    if (err) {
      return res.end('404 Not Found.')
    }
    res.end(data)
  })
})

// 3. 绑定端口号，启动服务
server.listen(3000, function () {
  console.log('running...')
})
```

### 写出apache的那种目录列表

```
// 1. 如何得到 wwwDir 目录列表中的文件名和目录名
//    fs.readdir
// 2. 如何将得到的文件名和目录名替换到 template.html 中
//    2.1 在 template.html 中需要替换的位置预留一个特殊的标记（就像以前使用模板引擎的标记一样）
//    2.2 根据 files 生成需要的 HTML 内容

// 2.1 生成需要替换的内容
var content = ''
files.forEach(function (item) {
// 在 EcmaScript 6 的 ` 字符串中，可以使用 ${} 来引用变量
content += `
<tr>
    <td data-value="apple/"><a class="icon dir" href="/D:/Movie/www/apple/">${item}/</a></td>
    <td class="detailsColumn" data-value="0"></td>
    <td class="detailsColumn" data-value="1509589967">2017/11/2 上午10:32:47</td>
</tr>
`
})
// 2.3 替换,原本的html文件里面的body中就只有特殊标记^_^通过这个特殊标记进行替换
data = data.toString()
data = data.replace('^_^', content)

// 3. 发送解析替换过后的响应数据
res.end(data)
```

### 读取目录

```
var fs = require('fs')

fs.readdir('D:/Movie/www', function (err, files) {
  if (err) {
    return console.log('目录不存在')
  }
  console.log(files)
})
```

## 代码风格与渲染

- [JavaScript Standard Style](https://standardjs.com/)
- Airbnb JavaScript Style

- 服务端渲染和客户端渲染的区别
  + 客户端渲染不利于 SEO 搜索引擎优化
  + 服务端渲染是可以被爬虫抓取到的，客户端异步渲染是很难被爬虫抓取到的
  + 所以你会发现真正的网站既不是纯异步也不是纯服务端渲染出来的
  + 而是两者结合来做的
  + 例如京东的商品列表就采用的是服务端渲染，目的了为了 SEO 搜索引擎优化
  + 而它的商品评论列表为了用户体验，而且也不需要 SEO 优化，所以采用是客户端渲染

##### 客户端渲染

```
先进行页面请求
然后对于里面的数据，还要进行Ajax请求，会出现多次请求

服务端压力小
但是响应块
```

<img src="Node.js.assets/image-20210813104803640.png" alt="image-20210813104803640" style="zoom:50%;" />

##### 服务器端渲染

```
就只进行一次请求，在请求的时候服务器端会先把数据渲染入页面，然后把页面发给前端

服务器端压力变大
不需要客户端进行处理
```

<img src="Node.js.assets/image-20210813104946982.png" alt="image-20210813104946982" style="zoom:50%;" />

##### 如何查看是不是服务端渲染出来的

```
网页查看源代码，存在的是服务端渲染出来的，不存在的是客户端渲染出来的
```

## 案例

### npm安装

```
//    npm install art-template
//    该命令在哪执行就会把包下载到哪里。默认会下载到 node_modules 目录中
//    node_modules 不要改，也不支持改。
```

### art-template模板引擎

```
注意：在浏览器中需要引用 lib/template-web.js 文件

强调：模板引擎不关心你的字符串内容，只关心自己能认识的模板标记语法，例如 {{}}
{{}} 语法被称之为 mustache 语法，八字胡啊。
```

```
<script src="node_modules/art-template/lib/template-web.js"></script>
```

```
<script type="text/template" id="tpl">
    <p>大家好，我叫：{{ name }}</p>
    <p>我今年 {{ age }} 岁了</p>
    <h1>我来自 {{ province }}</h1>
    <p>我喜欢：{{each hobbies}} {{ $value }} {{/each}}</p>
</script>
```

```
<script>
var ret = template('tpl', {
    name: 'Jack',
    age: 18,
    province: '北京市',
    hobbies: [
        '写代码',
        '唱歌',
        '打游戏'
    ]
})

console.log(ret)
</script>
```

```
输出：
    <p>大家好，我叫：Jack</p>
    <p>我今年 18 岁了</p>
    <h1>我来自 北京市</h1>
    <p>我喜欢： 写代码  唱歌  打游戏 </p>
```

### 使用模板引擎实现apache目录

```
var http = require('http')
var fs = require('fs')
var template = require('art-template')

var server = http.createServer()

var wwwDir = 'D:/Movie/www'

server.on('request', function (req, res) {
  var url = req.url
  fs.readFile('./template-apache.html', function (err, data) {
    if (err) {
      return res.end('404 Not Found.')
    }
    // 1. 如何得到 wwwDir 目录列表中的文件名和目录名
    //    fs.readdir
    // 2. 如何将得到的文件名和目录名替换到 template.html 中
    //    2.1 在 template.html 中需要替换的位置预留一个特殊的标记（就像以前使用模板引擎的标记一样）
    //    2.2 根据 files 生成需要的 HTML 内容
    // 只要你做了这两件事儿，那这个问题就解决了
    fs.readdir(wwwDir, function (err, files) {
      if (err) {
        return res.end('Can not find www dir.')
      }

      // 这里只需要使用模板引擎解析替换 data 中的模板字符串就可以了
      // 数据就是 files
      // 然后去你的 template.html 文件中编写你的模板语法就可以了
      var htmlStr = template.render(data.toString(), {
        title: '哈哈',
        files: files
      })

      // 3. 发送解析替换过后的响应数据
      res.end(htmlStr)
    })
  })
})
server.listen(3000, function () {
  console.log('running...')
})
```

```
<tbody id="tbody">
    {{each files}}
    <tr>
        <td data-value="apple/"><a class="icon dir" href="/D:/Movie/www/apple/">{{$value}}/</a></td>
        <td class="detailsColumn" data-value="0"></td>
        <td class="detailsColumn" data-value="1509589967">2017/11/2 上午10:32:47</td>
    </tr>
    {{/each}}
</tbody>
```

### 留言板

```
浏览器收到 html 响应内容之后，就要开始从上到下依次解析，
当在解析的过程中，如果发现：
	link,script,img,iframe,video,audio等带有src或者href（link）属性标签（具有外链的资源）的时候，浏览器会自动对这些资源发起新的请求。
```

```
我们为了方便 的统一处理静态资源，所以把所有的静态资源都存在pubic目录下
public/	css/img/js/lib

如果请求以public开头，使用 url.indexOf('/public/')===0
就readFile url 并 res.end(data);
```



## 大案例





# end