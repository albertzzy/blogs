## process

1. process.stderr,process.stdout 区别于其他node流在于，他们不能end，也不emit 'finish'event

2. process.cwd() 返回的是当前node进程所在的目录

3. process.kill //just a signal sender

4. process.exit //强制关闭进程（不管有没有没完成的事） ，node进程在没有额外的工作等待的时候会自己关闭，用process.exitCode告诉node关闭进程的时候的退出码是什么。
process.exit() // 默认是0，或者如果process.exitCode设置了值，就是这个的值。


