##crypto

### class Cipher

1. 它的实例是可读可写流
2. 它用来加密数据

### class Hash

1. 生成数据的hash摘要
2. 实例也是可读可写流

三种方法生成hash

```javascript

	var crypto = require('crypto');
	var hash = crypto.createHash('sha256');
	var fs = require('fs');

	// 1 
	hash.on('readable', () => {
	  var data = hash.read();
	  if (data)
	    console.log(data.toString('hex'));
	    // Prints:
	    //   6a2da20943931e9834fc12cfe5bb47bbd9ae43489a30726962b576f4e3993e50
	});

	hash.write('some data to hash');
	hash.end();

	//2
	var input = fs.createReadStream('test.js');
	input.pipe(hash).pipe(process.stdout);

	//3
	hash.update('ajsdflkasdf');
	console.log(hash.digest('hex'));

```

