## global

node 中顶层作用域不是全局作用域，var something 会是模块内部的



### 几个函数

1. setTimeout
2. setImediate  //属于check观察者，其设置的回调函数，会插入到下次事件循环的末尾。
3. process.nextTick   //设置的回调函数，会在代码运行完成后立即执行，会在下次事件循环之前被调用，

``` javascript

	setInterval(function() {
	    setTimeout(function() {
	        console.log('setTimeout3');
	    }, 0);

	    setImmediate(function() {
	        console.log('setImmediate4');
	    });

	    console.log('console1');

	    process.nextTick(function() {
	        console.log('nextTick2');
	    });
	}, 100)

// console1
// nextTick2
// setImmediate4
// setTimeout3

// console1
// nextTick2
// setTimeout3
// setImmediate4

```



### 何时使用exports 何时用module.exports

1. node 模块实际导出的只能通过module.exports暴露
2. 如果exports被覆盖赋值，则那个值是无法输出的。了避免在后面的代码中仍然使用 exports.xx = yy 而导致不能正确输出，如```javascript exports = 'hello' ``` 可以这样
```javascript exports = module.exports = xxx ```



### 其他全局变量
 
1. require.resolve()  //找模块的位置，但不会加载模块，只返回解析后的文件名
2. require.cache //当模块被引入时，它们会缓存到这个对象
3. __dirname //等同于 __filename 的 path.dirname() ,实际上不是一个全局变量，而是每个模块内部的
4. __filename //
