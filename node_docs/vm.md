## vm

1.script.runInContext(contextifiedSandbox[, options])  //无访问local scope 的权限，在vm.createContext创建的sandbox中运行

```javascript

	const util = require('util');
	const vm = require('vm');

	const sandbox = {
	  animal: 'cat',
	  count: 2
	};

	const script = new vm.Script('count+=1; name = "kitty";');

	const context = new vm.createContext(sandbox);// 这句注释掉会报错

	for (var i = 0; i < 10; ++i) {
	  script.runInContext(sandbox);  //此方法必须得是一个vm.createContext创建的sanbox，才能运行
	}

	console.log(context === sandbox); //true

	console.log(util.inspect(sandbox));

```


2.script.runInNewContext([sandbox][, options])  //无访问local scope 的权限,但sandbox可以为plain object.

3.script.runInThisContext([options]) //无访问local scope 的权限，但可以访问当前的global对象。


4.vm.createContext([sandbox]) //创建一个沙盒上下文，可用于多次运行脚本，比如模拟一个浏览器，它可以创建单一的沙盒，所有的script标签都运行在这个沙盒里。vm.runInContext() | script.runInContext()这两个方法都得用这个方法创建的sandbox


5. vm.isContext(sandbox) //判断sandbox是否被 vm.createContext()方法 contextified过了。


6. vm.runInContext(code, contextifiedSandbox[, options]) //无访问local scope 的权限


7. vm.runInDebugContext(code) //可以找到方法所在的文件

8. vm.runInNewContext(code[, sandbox][, options])

9. vm.runInThisContext(code[, options]) // 

```javascript

	//eval 可以改变local 变量，而vm.runInThisContext 则不行
	//vm.runInThisContext 和 eval 非直接调用(0,eval)('code')很像
	const vm = require('vm');
	var localVar = 'initial value';

	const vmResult = vm.runInThisContext('localVar = "vm";');
	console.log('vmResult:', vmResult);
	console.log('localVar:', localVar);

	const evalResult = eval('localVar = "eval";');
	console.log('evalResult:', evalResult);
	console.log('localVar:', localVar);

```


