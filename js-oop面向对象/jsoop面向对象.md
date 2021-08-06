# js对象

## 1、js的解析与执行过程

### 1、全局

#### 1、预处理阶段

##### 1、创建词法环境 Lexical Environment

全局的词法环境对象等价于window对象（顶级的Lexical Environment是window）

ecma 标准文档里面，词法环境对象分的比较详细，有变量的environment等。

```
lexicalEnvironment{
    a: undefined
    xxx: 对函数的一个引用
}
```

用var定义的变量

用声明的方式创建的函数

```
函数表达式的方式
var g = function() {}
函数声明的方式
function xxx() {}
```

##### 2.先扫描函数声明后扫描变量（var声明）

处理函数声明时有冲突，会覆盖

处理变量声明时有冲突，会忽略



#### 2、执行阶段



### 2、函数

#### 1、预处理阶段

每调用依次，产生一个lexical environment

先函数的参数。内部声明式函数，内部var变量，冲突情况与全局处理一样

```
首先把函数的参数写入，然后内部声明式函数写入词法，冲突情况：函数和参数的冲突以函数为主，参数和var变量冲突以参数为主
```



#### 2、执行阶段

给预处理阶段的成员赋值

如果没有用var声明的变量，会成为最外部的词法环境成员



## 2、作用域

```
示例代码：
console.log(a);
console.log(b);
console.log(c);
console.log(d);

var a = 1;
if (false) {
var b = 2;
} else {
c = 3;
}
function f() {
var d = 4;
}
```



### 1、定义

确定一个变量，函数，成员在整个程序里面可以被访问

### 2、块作用域

js没有块作用域的概念

```
{}
在这个块里面生效，外面不生效
```



### 3、函数作用域

在函数内部生效，外部不生效



### 4、动态作用域

js本身没有动态作用域的概念，本身是静态作用域

```
function f() {
console.log(x);
}
function f1() {
var x = 5;
f();
}
function f2() {
var x = 6;
f();
}
```



### 5、词法作用域（也称为静态作用域或闭包）

什么是静态，就是在声明的阶段就已经确定了相关的作用域

#### 1.js的作用域解析

```
function f() {}
function f1() {f()}
```

在创建f函数的时候，会添加一个成员，一个看不到摸不着的成员[[scope]]，这个值，就等于创建它的那个词法环境，所以等于window，

当真正执行f()的时候，会创建自己的词法环境，会和f.[[scope]]进行关联，如果在自己的词法环境里面找不到变量，就会去scope里面进行寻找，如果找不到就会报错

```
le:词法环境
function f() {	//scope == window
	// le{x=100} -> f.[[scope]]
	var x = 100;
	function g() {	//g.[[scope]] == f.le
		le -> g.[[scope]]
	}
	g();
}
g.le -> g.[[scope]](f.le) -> f.[[scope]](window)
```



#### 2.用new function创建函数

```
function f() {}
var f = function () {}
var f = function x(argument) {}
var f = new Function('', 'alert(xxx')
```

```
function f() {
var x = 100;
g.[[scope]] == window ,而不是等于f.le
var g = new Function('', 'alert(x)');
g();
}
```
