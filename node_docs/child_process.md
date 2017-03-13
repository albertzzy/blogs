## child_process

各方法返回一个Childprocess

1. ```javascript  require('child_process').exec ``` [命令]衍生一个shell,并在shell中执行command,且缓冲任何产生的输出。

2. ```javascript  require('child_process').execFile ``` [命令（但要指定shell参数）、文件]类似上面的，但不衍生shell，而是，指定的可执行的 file 被直接衍生为一个新进程，这使得它比 child_process.exec() 更高效。

3. ```javascript  require('child_process').fork ``` [文件]该方法为 ```javascript child_process.spawn() ```  的一个特殊情况，专门用于衍生Node.js进程。返回的Childprocess对象有一个额外的内置的通信通道，允许消息在父进程和子进程之间来回传递。（每个进程都有自己的内存，不推荐衍生大量的Node.js 进程）

4. ``` javascript  require('child_process').spawn ```  [命令] command 和 args 中的命令行参数来衍生一个新进程，通过options参数可以配置command是否在shell中运行，以及子进程的stdio.（fork 就是进行了一定的stdio配置）


