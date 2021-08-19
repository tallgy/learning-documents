# Vue

## vue认识

### Vue是一个渐进式的框架

```
渐进式意味着你可以将Vue作为你应用的一部分嵌入其中,带来更丰富的交互体验。
或者如果你希望将更多的业务逻辑使用Vue实现,那么Vue的核心库以及其生态系统。
比如Core+ Vue-router+Vuex ,也可以满足你各种各样的需求。
```

### 特点和常用的高级功能

```
解耦视图和数据
可复用的组件
前端路由技术
状态管理.
虚拟DOM
```

## vue安装

1.CDN引入

2.下载引入

3.npm安装

## vue基本使用

### 开始

```
我们来阅读JavaScript代码,会发现创建了一 个Vue对象。
创建Vue对象的时候,传入了一些options: {}
{}中包含了el属性:该属性决定了这个Vue对象挂载到哪一个元素上,很明显,我们这里是挂载到了id为app的元素上。
{}中包含了data属性:该属性中通常会存储一些数据
	这些数据可以是我们直接定义出来的,比如像上面这样。
	也可能是来自网络,从服务器加载的。
```

```
  <div id="app">
      <h2>{{message}}</h2>
      <p>{{name}}</p>
  </div>
  <script>
    //let变量/const常量
    //编程范式：声明式编程
    const app = new Vue({
      el:"#app",//用于挂载要管理的元素
      data:{//定义数据
        message:"HelloVuejs",
        name:"zzz"
      }
    })
    
    //原生js做法（编程范式：命令式编程）
    //1.创建div元素，设置id属性
    //2.定义一个变量叫message
    //3.将message变量放在前面的div元素中显示
    //4.修改message数据：helloworld
    //5.将修改的元素再次替换到div
  </script>
```

```
el:
    类型: string | HTMLElement
    作用:决定之后Vue实例会管理哪一个DOM。
data:
    类型: Object| Function
    作用: Vue实例对应的数据对象。
methods:
    类型: { [key: string]: Function }
    作用:定义属于Vue的一些方法,可以在其他地方调用,也可以在指令中使用。
```

### vue for 循环列表展示

```
v-for指令	item in movies   {{ item }}
```

```
  <div id="app">
      <h2>{{message}}</h2>
      <ul>
        <li v-for="(item, index) in movies" :key="index">{{item}}</li>
      </ul>
  </div>
  <script>
    //let变量/const常量
    //编程范式：声明式编程 
    const app = new Vue({
      el:"#app",//用于挂载要管理的元素
      data:{//定义数据
        message:"你好啊",
        movies:["星际穿越","海王","大话西游","复仇者联盟"]
      }
    })
  </script>
```

### 点击按钮事件,计数器

```
v-on:click=""
这个是上面的语法糖 @click=""
```

```
  <div id="app">
      <h2>当前计数：{{count}}</h2>
      <!-- <button v-on:click="count--">-</button>
      <button v-on:click="count++">+</button> -->

      <button v-on:click="sub()">-</button>
      <button @click="add()">+</button>
  </div>
  <script>
    const app = new Vue({
      el:"#app",//用于挂载要管理的元素
      data:{//定义数据
        count:0
      },
      methods: {
        add:function(){
          console.log("add")
          this.count++
        },
        sub:function(){
          console.log("sub")
          this.count--
        }
      },
    })
  </script>
```

```
计数器的MVVM
我们的计数器中就有严格的MVVM思想
    ➢View依然是我们的DOM
    ➢Model就是我们我们抽离出来的obj
    ➢ViewModel就是我们创建的Vue对象实例
它们之间如何工作呢?
    ➢首先ViewModel通过Data Bindingli上obj中的数据实时的在DOM中显示。
    ➢其次ViewModel通过DOM Listener来监听DOM事件,并且通过methods中的操作,来改变obj中的数据。
```



## vue的MVVM

```
Model ViewModel View 
ViewModel是Model和View通信之间的桥梁，当你有数据要展示的时候，ViewModel会自动把数据绑定到View上面，当我们View有些事件或操作也是通过ViewModel
```

<img src="vue.assets/image-20210819162257668.png" alt="image-20210819162257668" style="zoom:50%;" />

```
View层:
➢视图层
➢在我们前端开发中，通常就是DOM层。
➢主要的作用是给用户展示各种信息。
Model层:
➢数据层
➢数据可能是我们固定的死数据，更多的是来自我们服务器，从网络上请求下来的数据。
➢在我们计数器的案例中，就是后面抽取出来的obj,当然，里面的数据可能没有这么简单。
VueModel层:
➢视图模型层
➢视图模型层是View和Model沟通的桥梁。
➢一.方面它实现了DataBinding，也就是数据绑定，将Model的改变实时的反应到View中
➢另一方面它实现了DOM Listener， 也就是DOM监听，当DOM发生一些事件(点击、滚动、touch等)时，可以监听到，并在需要的情况下改变对应的Data。
```

## 什么叫做方法，什么叫做函数

```
方法：method,和某一个实例对象像挂钩
函数：function

函数：写在外面
function a() {}
方法：定义在类里面
function Person() { function a() {} }
```

## vue的生命周期

```
诞生到消亡的过程
```

