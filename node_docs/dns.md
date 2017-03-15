## dns 
分成两类方法

1. 1类方法只有一个方法  ```javascript dns.lookup(hostname[, options], callback) ``` 这个方法不会去进行网络请求，会调用系统底层来解析域名

2. 2类方法会去请求dns server 来解析域名

