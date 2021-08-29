jQuery



#### 1.jQuery和js入口函数的区别

```
$(function() {
	jQuery
});

window.DOMContentLoaded = function() {
	原生js
}
```

dom结构渲染完成即可执行内部代码，不必等到所有外部资源加载完成。jQuery完成了封装

相当于原生的DOMContentLoaded

不同于原生的load，这个是要等页面文档，外部js文件，css文件，图片加载完毕才执行内部代码



#### 2.dom对象和jQuery对象相互转换

```
var $myVideo = $('div');
var myVideo = document.querySelector('div');

dom转jQuery
$(myVideo)

jQuery转dom
$('div')[0]
$('div').get(0)

```







