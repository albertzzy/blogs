## stream

1. http请求，process.stout等都是流的实例
2. 所有的流都是 EventEmitter 的实例
3. 可读可写流都有独立的内部缓存，其大小可通过highWaterMark选项设置
4. httpserver 中req 是http.IncomingMessage 的实例，这是一个 Readable Stream，res 是 http.ServerResponse 的实例，这是一个 Writable Stream
5. 对象模式（必须是string / buffer） & 非对象模式（可以是任意类型除了null）




### 四种类型

1. Readable - 可读的流 (例如 fs.createReadStream()).   必须实现  _read([size])  方法  
2. Writable - 可写的流 (例如 fs.createWriteStream()).  必须实现  _write([size]) 方法 ， _writev() 用来一次处理缓存池重的所有模块
3. Duplex - 可读写的流 (例如 net.Socket).
4. Transform - 在读写过程中可以修改和变换数据的 Duplex 流 (例如 zlib.createDeflate())


### 可读流的两种工作模式
1. flowing  // 自动从系统底层读取数据，并通过 EventEmitter 接口的事件尽快将数据提供给应用 
2. paused  //必须显式调用 stream.read() 方法来从流中读取数据片段

3. 两种工作模式可以互相转换

paused ==[监听data事件，stream.resume()，stream.pipe()]==> flowing 

flowing ==[stream.paused()] ==> paused