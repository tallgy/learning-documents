# js对象

## 1、js的解析与执行过程

### 	1、全局

#### 		1、预处理阶段

##### 			1、创建词法环境 Lexical Environment

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

```
对于一个函数要使用一个变量/函数，首先会从它本身的一个词法环境里面去寻找，如果找不到就去它的scope，就是创建它的那个词法环境去寻找，直到到window对象
```



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



#### 3.闭包初识

在这里，我们可以将a，b放在了匿名函数里面，然后把f赋值给了window对象里面，通过这样，可以把a，b不用写成全局作用域，

但是对于c系列的语言来说，局部变量在执行之后会弹出（因为局部变量是放在栈里面）所以在这个匿名执行函数执行之后，应该会把ab的变量弹出，但是js不会这样

```
(function() {
var a = 5;
var b = 6;
function f() {
console.log(a);
}
window.f = f;
})();
f();
```



## 3.闭包

### 1.什么是闭包

学习Javascript闭包（Closure） ．新浪博客

```
闭包就是能够读取其他函数内部变量的函数。例如在javascript中，只有函数内部的子函数才能读取[局部变量]，所以闭包可以理解成“定义在一个[函数]内部的函数“。在本质上，闭包是将函数内部和函数外部连接起来的桥梁
```

Wiki的解释

```
在计算机科学中，闭包（closure）是词法闭包（lexical closure）的简称，是引用了自由变量的函数。这个被引用的自由变量将和这个函数一同存在，即使已经离开了创造它的环境也不例外。所以，有另一种说法认为闭包是由函数和与其相关的引用环境组合而成的实体。
```

```
在程序预处理阶段，先生成了f1的词法环境，在进行f2函数的预处理时，会查看是否需要父类函数的变量，如果需要就会提前把值写入scope中，（不同浏览器的做法不同，有的可能会直接把f1的le词法环境直接写入scope中）然后逐步进行执行，到了f1的子函数内部f2。


（1.会将f1的词法环境全部保存入f2的闭包中）（2.会在f2预处理和执行（函数在需要被执行的时候才会进行预处理）所以发现子函数f2会使用父函数f1的变量，此时再把变量放入f2的scope的闭包中（这里理解应该是错误的）
```

```
代码示例：
function f1() {
//这里先进行f1的预处理，里面有a,f2（在f1预处理时对f2进行预处理，发现需要f1的变量再把变量写入f2.scope里面）,b,c
//然后逐步执行到f2
	var a = 100;
    function f2() {
        var d = 10;
        console.log(a);
    }
    var b = 200;
    f2();
    var c = 300;
}
f1();


问题，下面这个a是放在了window里面，属于一个全局的，所以没有使用到闭包，就算在new函数里面的函数使用到了a也不会产生闭包
var a = 100;
function New() {
    var b = 10;
    console.log(a);
}
New();
```



```
1.一种认为闭包是一个对象，对象里面是一个函数和被函数封闭捕获的变量
2.另一种，闭包是一种函数，函数里面带着被函数封闭捕获的变量
```

```
2.在js里面，一个函数要在另一个函数的内部才会产生闭包。
```

```
3.一个函数没有使用到父函数的的东西，不会产生闭包
```

```
4.函数使用了父的父也产生闭包
```

```
5.不一定要把子函数返回出去，只要子函数使用了父函数的变量就产生了闭包
function f1() {
function f2() {

}
f2()
}
```

```
6.闭包是什么时候创建的，是在函数被创建，但是没有执行的时候，在那个预处理阶段，发现需要使用到父类的变量，所以使用到了闭包。
```

```
7.闭包的本质，js支持作用域链，并且支持函数嵌套函数
```



### 2.‘闭’了什么



### 3.如何查看闭包



### 4.闭包的好处

减少全局变量

减少传递给函数的参数数量

```
function calFactory(base) {
return function (max) {
var total = 0;
for (let i=1; i<-max; i++) {
total += i;
}
return total + base;
}
}
var adder = calFactory(2);
alert(adder(3));
```

封装

```
(function (){
var m = 0;
function getM() {
return m;
}
function setM(val) {
m = val;
}
window.g = getM;
window.s = setM;
})();
s(12);
console.log(g());
```



### 5.使用闭包的注意点

1.对捕获的变量只是一个引用，不是复制

2.父函数每调用依次，会产生不同的闭包

3.循环中的问题

```
for (var i=0; i<3; i++) {
    var ele = document.getElementById(i);
    ele.onclick =
        (function (id) {
            return function () {
            	console.log(id);
            }
        })(i);
}
```



## 4.类与对象

### 	1.对象

#### 		1.对象的种类

```
基本数据类型：undefined null number string Boolean
对象类型
```

js内置的（number）

宿主环境的（window）

自己创建的



#### 		2.对象的创建

```
var p = {
name: 'cj',
work: function () {
console.log('working...');
},
// _下划线，是一个约定，作为不能直接使用
_age: 18,
get age() {
return this._age;
},
set age(val) {
this._age = val;
},
address: {
home: 'aaaa',
}
};

console.log(p.age);
console.log(p._age);
p.age = 30;
console.log(p['age']);
console.log(p["address"]['home']);
```



##### 			1.对象字面量形式

属性

```
name: 'cj',
```

方法

```
get age() {
return this._age;
},
```

get set型属性

```
// _下划线，是一个约定，作为不能直接使用，作为一个私有变量
_age: 18,
get age() {
return this._age;
},
set age(val) {
this._age = val;
}

console.log(p.age);
console.log(p._age);
p.age = 30;
```



##### 			2.成员访问

两种访问方法

```
p.age
p['age']
```

没有的时候会返回undefined

```
p.aaaa
```

级联访问

```
p.address.home;
p["address"]['home'];

这样写比较好，避免了没有address报错问题
var result = p && p.address && p.address.home;
```



##### 			3.object

```
object.defineProperty(p, 'yy', {
value: 100, //设置yy的值
writable:false	//设置yy不可写
})
如果不设置属性的话，全部设置默认为false
object.defineProperty(p, 'yyx'，{value:20})


object.defineProperties(p, {
salary: {
	get,set,writable(写),enuerable(枚举),configurable(配置),value
	value: 100,
	writable: false,
},
gender: {
	value: 200,
},
height: {
	get: function() {
		return 130;
	},
	set: function(val) {
		val.log
	}
}
})
```

##### 			4.工厂创建对象

```
// 工厂函数创建对象
function PersonFactory(pname, page) {
return {
name: pname,
age: page,
head: 1,
};
}
var p1 = PersonFactory('cj', 22);
var p2 = PersonFactory('david', 33);
```



#### 		3.对象的基本操作

成员的遍历

```
Object.key(p).log
for (xs in p) {xs.log}
```

检查对象是否有某个属性

```
'name' in p;
要自己拥有，属于父类的也属于false
p.hasOwnProperty('name')
p.name
```

成员的删除

​	有些属性是不能删除的



#### 	4.成员特性

```
writable
	是否可以改变值
enuerable
	是否可以枚举，for in，false就不会出现
configurable
	是否可以配置，比如把writable设置为true...
	
得到对象的属性特性描述
Object.getOwnPrepertyDescriptor(p, 'address')
```



#### 	5.constructor

构造器，把object当成一个类，o1是类创建出来的对象，可以理解为一个模具

对象才有构造器

```
var o = {}
var o1 = new Object();

o.constructor.log
o1.constructor.log

o.constructor === o1.constructor
```

```
Number.constructor --> function Function()

function f() {}
f.constructor --> function Function()

Function.constructor --> function Function()
```

```
var a = 1;
a.constructor --> function Number()
```

```
(最顶级的)Function -> Function
Function -> Object/Number/Array
Object -> {}/new object
Number -> (var a = 1)/ new number(1)
```



#### 		6.类型检查

```
typeof(o)	[function/object]
o.instanceof(Object) [true/false]
```



### 2.类的创建

#### 	1.构造函数模式

作为一个类创建一个对象

```
// 作为一个类
function Person() {
this.age = 30;
var name = '1';
}
Person.prototype.head = 1;
var p = new Person();
console.log(p.age);     //30
console.log(p.name);    //undefined
```



#### 	2.伪类模式



### 3.原型初探

#### prototype属性

#### 神秘的\__proto__

prototype原型

只有函数才有prototype,属于函数的属性，指向了一个对象，

```
在类中，互不干扰的使用this，相同的使用原型
```

```
p.constructor.prototype.head
```



通过构造器函数创建出来的对象和共有的东西（原型）有关系，但是和函数没有关系的

```
p.name --> cj
p.constructor = {name: 300}
p.name --> cj
并且p.head还是存在,说明了对于p找不到head的时候，不是通过p.constructor.prototype.head来进行寻找

Person.prototype.head = 3
p.constructor.prototype.head = 3;
p.head --> 3

个人理解：p.constructor.prototype原本和p.__proto__指向的是一个对象，如果只是对里面的值进行修改不会引起地址的变化的话是相等的，如果是将一个对象进行了修改了，那么将会引起prototype的指向的地址的变化，此时p.__proto__和p.constructor.prototype就不是一个地址了，所以会出现上面的问题
```

```
用构造器函数创建的对象跟构造器的原型对象有一个链接不是通过constructor.prototype建立的,而是每一个对象有一个隐藏的__proto__来指向了创建时的原型对象
__proto__在谷歌和火狐可以访问，但是这个不是一个标准，在ie是没有的
```

```
p.head -> 2
Person.prototype.head = 3
p.head -> 3
```

```
这三个指向的原本是一个对象
p.constructor.prototype
Person.prototype
p.__proto__
```

```
Person.prototype = {xx: 'xx'};
此时Person的prototype将会指向一个新的对象，但是原本的p.__proto__将不会改变，因为上面的操作是将Person的地址进行了修改，而p.__proto__的指向已经确定，对于已经创建的对象p没有影响，只是对于新创建的p2(new Person())会和Person.prototype影响
```

```
原来p2中没有xx，原型中有xx，但是通过下面的方式设置的xx，不会修改为原型的，而是直接在p2中进行添加新的xx
p2.xx = 'YY'
person.prototype.xx -> xx
```



### 	4.this

#### 		1.基本原则

```
this指向由运行时决定
函数是谁调用的，this就指向谁

ff(); --> window.ff();
```



#### 		2.如何改变this指向

```
function print(a, b) {this[a].log; this[b].log}

print('name', 'age') --> window.this

call，第一个参数，要改变的this的指向的结果,后面参数为要传递的参数
print.call(obj, 'name', 'age');  --> o.print('name');

apply,第一个参数，为this的指向，第二个参数为一个参数的数组
print.apply(o, ['name', 'age'])
```



### 	5.new的实现

call和apply还有隐含的意义

```
function p() {this.name = 1;}
var o = {};
p.call(o);

说明了在执行代码的时候，动态的给o对象创建了一个name属性
o.name --> 1
通过这个想法来实现一个new的过程
```

```
自定义一个new过程，实现，把对象的__proto__指向了要new的protorype
并且进行了对象的赋值
function Person(name, age) {
    this.name = name;
    this.age = age;
}
//f是个函数，f 是个构造器函数
function N(f) {
    return function () {
        var o = {
        	"__proto__": f.prototype
        };
        f.apply(o, arguments);
        return o;
    }
}
N(Person)('aa', 1);
```

```
js的类
使用constructor指向了被创建的对象(Person),再创建一个__proto__指向了Person的prototype
```

```
如果这样写，在产生对f的闭包的同时，会产生对o的闭包，原本闭包只是捕获了f，现在也捕获了o
function N(f) {
    var o = {
    	"__proto__": f.prototype
    };
    return function () {
        f.apply(o, arguments);
        return o;
    }
}
N(Person)('aa', 1);
```

```
自己的写法
function A(f, args) {
    var o = {
    	'__proto__': f.prototype
    };
    f.apply(o, args);
    return o;
}
A(Person, ['11', 2])
```



```
var a = {
	'__proto__': Person.prototype
}
我们可以发现，只要把一个对象的 __proto__ 属性赋值给了谁，那么他就是属于谁的对象。默认为一个object的原型
var b = {}
b.__proto__ === Object.prototype	--> true
```



```
对象p2，使用new关键字，加上__proto__对象，指向函数的原型对象，同时加上constructor指向函数，函数创建的时候有个prototype指向了原型对象
```



## 5.封装

信息隐藏

### 	1.命名空间

```
命名空间p
var p = {}
子对象c，也可以被称为一个命名空间
p.c = {}
```



### 	2.成员

#### 		1.静态

```
function Person(name) {
    this.name = name;
    var age = 123;	//这个不会出现在成员里面
}
这个属于静态成员
Person.usetools = true;
var p1 = new Person(1);
```



#### 		2.公有

```
对象字面量创建的方法
```



#### 		3.私有

```
下划线开头
```



```
function Person(name) {
    var age = 1;
    私有函数
    function pm() {
    	console.log(this.name);
    }
    this.name = name;
    this.test = function () {
    	console.log('publick method');
    	这里this.name为空，下面的调用方式，前面没有 . 说明了是window对象，所以
    	pm();
    	修改,修改this指针
    	pm.call(this);
    }
}

var p1 = new Person();
p1.pm();	//访问不了
p1.test()	--> 在pm处输出空，因为pm为一种window对象的调用
window.name = 'g';
p1.test() --> 在pm处输出为g
```

```
使用对象工厂形式
function Person(pname) {
	function pm() {
		self.name;
	}
	var self = {
		name: pname;
		test: function() {
			pm();
		}
	};
	return self;
}

var p2 = Person('cj');
p2.test();
```



## 6.继承

子可以用父，

### 	1.对象形式的继承

#### 		1.子把父的东西全部直接复制

```
复制方式
var person = {
    name: a,
    add: {
    	home: 'home'
    }
};
var programer = {
	la: 'js',
};
```

```
浅拷贝，对于父对象里面还有对象和数组的引用的，将会只拷贝引用地址，而不会把值拷贝进来，子修改了，父也会被改
function extend(p, c) {
    var c = c || {};
    for (let pKey in p) {
        //浅拷贝
        c[pKey] = p[pKey];
    }
}
extend(person, programer);
```

```
深拷贝，使用了递归，在判断结果为对象和数组的时候将会调用递归，通过判断p[prop]的constructor属于Array还是其他的来判读是不是为数组，来赋值[] || {}
function extendDeeply(p, c) {
    var c = c || {};
    for (let prop in p) {
        if (typeof (p[prop]) === 'object') {
            c[prop] = (p[prop].constructor === Array) ? [] : {};
            extendDeeply(p[prop], c[prop]);
        } else {
        	c[prop] = p[prop];
        }
    }
}
extendDeeply(person, programer);
```

```
构造函数，通过new一个对象，然后进行call调用this
function Parent() {
    this.name = 'abc';
    this.add = {
    	home: 'home',
    };
}
function Child() {
    Parent.call(this);
    this.la = 'js';
}

var c = new Child();
var p = new Parent();
```

#### 		2.对父有个引用

```
原型链
var p = {
	name: 'cj'
};
function myCreate(p) {
    var ins;

    function F() {}
    F.prototype = p;
    ins = new F();

    return ins;
}
var c = myCreate(p);

// ems5,ie9，js自带的create方法
Object.create()
var c1 = Object.create(p);
var c2 = Object.create(p, {age: 1});
```

![image-20210808111153418](images/image-20210808111153418.png)

```
var ff = new FF();
ff.__proto__ === FF.prototype --> true
ff.__proto__ === ff.constructor.prototype --> true
```

```
ff.constructor 指向了 FF
ff.__proto__ 指向了 FF.prototype的指向
FF.prototype.constructor 指向了 FF
FF.prototype的__proto__ 指向了 Object.prototype的指向

对象的原型指向的是构造器的原型，
而对象的构造器的原型指向的是Object或者上级
对象的构造器的原型的构造器 指向的是 对象的构造器
```

![image-20210808112300231](images/image-20210808112300231.png)

### 	![290701352241158](images/290701352241158.jpg)

### 2.常用属性



### 	3.类形式的继承

#### 		1.继承实现

再谈instanceOf

```
左边对象，右边函数
new Number(123) instanceof Number; -> true
```

```
var f = new F()
f instanceof F;			--> true
f instanceof Object;	--> true
```

```
自定义的instanceof的实现
function Instance(f, F) {
    while (f.__proto__ != null) {
        if (f.__proto__ == F.prototype) {
        	return true;
        }
        f = f.__proto__;
    }
    return false;
}


function F() {};
function B() {};
var f = new F();
Instance(f, F)		--> true
Instance(f, Object)	--> true
Instance(f, B)		--> false
```



继承的实现

```
function P() {}
function C() {}

1.把C的proto指向了P，这样子可以用父的，但是这是把子和父统一了，不行
C.prototype = P.prototype

2.这是把c的原型变成new p,好处，这样可以避免了父子交互调用，但是如果P的里面存在大量不共通的数据，this.name...会造成内存的浪费
C.protorype = new P();

3.创建一个过渡函数，F的原型和p的原型相等，new一个f，f的原型指向了p的原型，c的原型指向了f。  
C.prototype -> f
f.constructor == F
f.__proto__ -> P.prototype

function F() {}
f.prototype = P.prototype;
var f = new F();
C.prototype = f;
等价于
C.prototype = Object.create(P.prototype);
```

```
完善
1.创建父函数，和父的原型
function Person() {}
Person.prototype.head = 1;
Person.prototype.ear = function () {
	console.log('eating...');
}

2.创建子函数
function Programmer() {}

3.连接子函数和父函数，这里在第二个修改了Programmer.prototype.constructor的指向，原本是指向为Person，现在改成了Programmer，这两个代码常常是一起的
Programmer.prototype = Object.create(Person.prototype);
Programmer.prototype.constructor = Programmer;

4.然后再写Programmer的原型，因为如果把原型写在上面，那么就会造成被覆盖
Programmer.prototype.la = 'js';
Programmer.prototype.work = function () {
	console.log('i am writing code in ' + this.la);;
}
```



#### 		2.通用方法

实现super,uber,base，constructor的修正

```
把上面那个继承进行了封装
function createEX(C, P) {
	下面这部分是实现了对constructor的修正的封装
	function F() {}
	F.prototype = P.prototype;
	C.prototype = new F();
	C.prototype.constructor = C;
	
	这个是实现了类似于java的super和base来调用父类的原型方法
	C.super = C.base = P.prototype;
}

Programmer.prototype.work = function() {
	('i am writing' + this.ls).log
	Programmer.super.eat();
}
```

调用父类的构造函数

```
进行了子函数调用父函数，通过apply将this指向改成了子函数
function P(name, age) {
	this.name = name;
	this.age = age;
}
function C(name, age, title) {
	P.apply(C, arguments);
}
```

一些方法

```
本身是否拥有
hasOwnProperty()

f.name = 'x'
f.hasOwnProperty('name') --> true
F.prototype.age = 1;
f.hasOwnProperety('age') --> false
```

```
查看一个原型对象是否是一个对象的原型
function F() {}
var f = new F();

查看原型对象（F.prototype）是不是属于对象（f）的原型
F.prototype.isPrototypeOf(f); --> true
```

```
得到f的原型对象的描述
Object.getPrototypeOf(f);
```



## 	7.多态

### 		1.方法重载

​	arguments,运行时的重载，通过判断传入的参数的数量和类型进行判断 该执行什么方法

```
function demo(a, b) {
	方法形参的个数
	demo.length
	实际参数的个数
	arguments.length
	第一个参数
	arguments[0]
}
```

```
function setting() {
    var ele = document.getElementById('js');
    if (typeof (arguments[0]) === 'object') {
        for (let p in arguments[0]) {
        	ele.style[p] = arguments[0][p];
    	}
    } else {
        ele.style.fontSize = arguments[0];
        ele.style.backgroundColor = arguments[1];
    }
}

setting(18, 'red');
setting({
    fontSize: 20,
    backgroundColor: 'green'
});
```



### 		2.方法重写

每个调用者都有方法，通过更改调用者来调用方法

```
var o = {
    run: function () { console.log('o is running...'); }
};
var p = { 
	run: function () { console.log('p is running...'); }
};
function demo(o) { o.run(); }
demo(o);
demo(p);
```

​	调用父类的方法

```
1.
function F() {}
var f = new F();

本身没有，调用父的
F.prototype.run = function () { 'F log'.log }
f.run();

这里因为原型链的查找规则，自己本身带有，所以直接调用本身
f.run = function() { 'f log'.log }
f.run();

内部调用了父的原型方法
f.run = function() {
	'f log'.log
	F.prototype.run();
}
f.run()
```

```
2.P()方法设置为this的指向，在C里面把P的方法设置为C的，然后再赋值给变量pRun，然后再重写this.run
function P() {
    this.run = function () {
    	console.log('parent is running...');
    }
}
function C() {
    P.call(this);
    var pRun = this.run;
    this.run = function () {
    	console.log('c is running...');
    	pRun();
    }
}
var c = new C();
c.run();
```

```
3.父将方法写入了原型，然后子继承了父的原型的同时，将父的原型对象地址赋值到了子的super里面。然后通过调用C.super来调用父的原型内部的方法。
function P() {}
P.prototype.run = function () {}

function C() {}
C.prototype = Object.create(P.prototype);
C.prototype.constructor = C;
C.super = P.prototype;

C.prototype.run = function () {
	C.super.run();
}

var c = new C();
c.run();
```



## 8.项目实战:miniQuery

### 	1.jquery理解

```
$(function(){})
利用的是
DomContetnLoaded
```

#### 		jquery扩展静态方法（工具方法）

```
$.extend({
	staticMethod: function() {
		alert('sm');
	}
});

$.staticMethod();
```

#### 		扩展实例方法

```
$.fn.extend({
	instanceMethod: function() {
		alert('im');
	}
});

$('').instanceMethod();
```

### 	2.对象数组

```
方式一
var o = {};
var arr = [3, 4, 5];
for (let i=0; i<arr.length; i++) {
	o[i] = arr[i];
}
o.length = arr.length;
```

```
var o = {};
var divs = document.getElentsBy..('');
Array.prototype.push.apply(o, divs);
```



### 	3.miniQuery基础

```
(function () {
    // 暴露外部使用接口
    let miniQuery = window.miniQuery = window.$ = function(selector) {

        // 没有用new方法的话，返回的会和miniQuery.prototype相等
        //里面的this就是miniQuery.prototype所以相等
        // return miniQuery.fn.init(selector);

        //加了new，miniQuery.prototype为返回值的__proto__
        //里面init函数貌似return this可以不用要，因为new方法
        // 已经再返回的时候传递了地址
        return new miniQuery.fn.init(selector);
    };
    
    // 处理原型对象，增加了init方法，用于进行初始化，并且通过new方法调用来返回指向位置
    miniQuery.fn = miniQuery.prototype = {
        init: function(selector) {
            let elements = document.getElementsByTagName(selector);
            Array.prototype.push.apply(this, elements);
            return this;
        },
        miniQuery: '1.0.0',
        length: 0,
        size: function () {
            return this.length;
        }
    };
   
    miniQuery.fn.init.prototype = miniQuery.fn;
    
    // 实现继承
    miniQuery.extend = miniQuery.fn.extend = function() {};
    
    // 添加静态方法
    miniQuery.extend({});
    
    // 添加实例方法
    miniQuery.fn.extend({});

})();
```

#### 		1.解决冲突

```
在最开始把window对象里面用到的专有名词先赋值，然后如果调用了noConflict方法，就会把window对象的专有名词的指向改变，并返回自己的专有对象。
noConflict: function () {
    window.$ = _$;
    window.miniQuery = _miniQuery;
    return miniQuery;
}
```

#### 		2.each方法回调函数

```
each: function (fn) {
    for (let i=0; i<this.length; i++) {
    	fn(i, this[i]);
    }
    //链式操作，把自己返回回去
    return this;
},
```

#### 		3.链式操作

```
在一个方法里面，return this,这样就会在返回值后使用方法，实现了 链式操作
a = {
	b: function() {
		'a'.log
		return this;
	}
}
a.b().b().b();
```

#### 		4.整体代码

```
(function () {

    let _$ = window.$;
    let _miniQuery = window.miniQuery;
    // 暴露外部使用接口
    let miniQuery = window.miniQuery = window.$ = function(selector) {

        // 没有用new方法的话，返回的会和miniQuery.prototype相等
        //里面的this就是miniQuery.prototype所以相等
        // return miniQuery.fn.init(selector);

        //加了new，miniQuery.prototype为返回值的__proto__
        //里面init函数貌似return this可以不用要，因为new方法
        // 已经再返回的时候传递了地址
        return new miniQuery.fn.init(selector);
    };
    // 处理原型对象
    miniQuery.fn = miniQuery.prototype = {
        init: function(selector) {
            let elements = document.getElementsByTagName(selector);
            Array.prototype.push.apply(this, elements);
            return this;
        },
        miniQuery: '1.0.0',
        length: 0,
        size: function () {
            return this.length;
        }
    };
    miniQuery.fn.init.prototype = miniQuery.fn;
    // 实现继承，只处理只有一个参数，就是插件的扩展
    miniQuery.extend = miniQuery.fn.extend = function() {
        var o = arguments[0];
        for (let p in o) {
            this[p] = o[p];
        }
    };
    // 添加静态方法
    miniQuery.extend({
        //去除前后空格
        trim: function (text) {
            return (text || '').replace(/^\s+|\s+$/g, '');
        },
        //解决冲突
        noConflict: function () {
            window.$ = _$;
            window.miniQuery = _miniQuery;
            return miniQuery;
        }
    });
    // 添加实例方法
    miniQuery.fn.extend({
        // get方法
        get: function (num) {
            return this[num];
        },
        // each方法
        each: function (fn) {
            for (let i=0; i<this.length; i++) {
                fn(i, this[i]);
            }
            //链式操作，把自己返回回去
            return this;
        },
        // css的实现
        css: function () {
            var l = arguments.length;
            if (l == 1) {
                return this[0].style[arguments[0]];
            } else {
                var name = arguments[0];
                var value = arguments]1;
                this.each(function (index, ele) {
                    this[index].style[name] = value;
                })
            }
            return this;
        }
    });

})();
```

# end

## 参考

```
哔哩哔哩：BV1EW411p7z3 陈军老师，麦子学院
```

## 后续学习

```
Object Oriented JavaScript
jQuery源代码
Pro JavaScript Design Patterns
高性能JavaScript
js权威指南
```

