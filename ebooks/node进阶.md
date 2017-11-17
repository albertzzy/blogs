《node进阶之路》
        模块的上下文是 module.exports === this 甚至可以直接用 this导出对象

        bootstrap_node.js node 最先执行的代码 - 主模块在这里加载执行

        ```js
                function test(){
                   this.xxx = 'xxx';
                   yyy = 'yyy';
                   console.log(this === global);//true
                }
                test();
                console.log(this === global); //false
        ```

        对某个对象动态添加或是删除某个属性就会创建隐藏类（存放了成员名称和偏移量，根据这些信息 利用数组索引的方式查找和存取成员）| 要尽量避免隐藏类的派生，造成优化回退

        垃圾回收算法
           v8 垃圾回收的时候会阻塞javascript运行
           v8 不会自动回收不被引用的对象，采用这种方式降低了垃圾回收的负担，因此设置堆内存大小限制（32位系统0.7G，64位1.4G）
           v8的堆分为 年轻代，老生代，大对象空间

        node 运行中对象不回收的情况
           1.全局变量，或由全局变量访问到的对象
           2.函数中的局部对象，包括这个局部对象可以访问到的对象
           3.一个非全局对象如果被一个闭包引用，则这个对象和闭包一同存在，即使离开了创建他的环境。
           这个对象称为自由变量，他保存这闭包的执行上下文环境。

        ```js
           var col = (function(){
              var name = 'foo'
              return function(){
                  console.log(name)
                  return name;
              }

              console.log(col)
          })()

           setTimeout(col,1000)
           col = null
        ```

        ```js
                var obj = {name:'obj'}
                var foo = function(){
                  var a = {}
                  a.obj = obj;
                  console.log(a)
                  return a;
                }

                setTimeout(foo,1000)
                foo = null;
        ```
        * 函数中的变量引用了函数外的变量，则函数呈现闭包特性，即使函数被设为null,依然存在


        ```js
            
            function foo(){
                let a = 1;

                return function(){
                    a++;
                    return a;
                }

            }

            var func = foo();
            console.log(func())
            console.log(func())
        ```