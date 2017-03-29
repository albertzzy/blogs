##net

提供socket接口

HTTP协议属于应用层，建立在传输层协议TCP之上。客户端通过与服务器建立TCP连接，之后发送HTTP请求与接收HTTP响应都是通过访问Socket接口来调用TCP协议实现。

1. net.createServer & http.createServer



