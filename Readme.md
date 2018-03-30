# aliyun-imm-node-sdk

## Installation

```
npm i aliyun-imm-node-sdk
```

* 目前还是内部版本，还未对外开放。

## Usage

Using node.js:

```js
const IMM = require('aliyun-imm-node-sdk');

var client = new IMM({
  endpoint:'http://imm.cn-shanghai.aliyuncs.com',
  accessKeyId: 'your_app_key_id',
  accessKeySecret: 'your_app_key_secret',
  apiVersion: '2017-09-06'
});

try{
  var opt = {
    MaxKeys: 10,
    Marker: ''
  };
  var result = await client.ListProjects(opt);
  console.log(result);
}catch(err){
  console.log(err);
}
```

In browser IMM is a global variable.
```js
var client = new IMM({
  endpoint:'http://imm.cn-shanghai.aliyuncs.com',
  accessKeyId: 'your_app_key_id',
  accessKeySecret: 'your_app_key_secret',
  apiVersion: '2017-09-06'
});
client.ListProjects().then(function(result){
  console.log(result)
}, function(err){
  console.log(err)
});
```


You can also use original `client.doAction` directly:

```js
var opt = {
  Action: 'ListProjects',
  Marker: '',
  MaxKeys: 10
};
client.doAction(opt)
```


For more details: see [API Document](https://help.aliyun.com/document_detail/63881.html)



## License

[MIT](LICENSE)
