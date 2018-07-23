# imm-2017-09-06-nodejs-sdk


The `@alicloud/imm-2017-09-06` is deprecated.

We recommend to use [@alicloud/pop-core](https://github.com/aliyun/openapi-core-nodejs-sdk) directly.


## Installation

```
npm i @alicloud/pop-core
```

## Usage

```js
const RPCClient = require('@alicloud/pop-core').RPCClient;

var client = new RPCClient({
  endpoint:'http://imm.cn-shanghai.aliyuncs.com',
  accessKeyId: 'your_app_key_id',
  accessKeySecret: 'your_app_key_secret',
  apiVersion: '2017-09-06'
});

try{
  var params = {
    MaxKeys: 10,
    Marker: ''
  };

  var result = await client.request('ListProjects', params);
  console.log(result);
}catch(err){
  console.log(err);
}
```


## About the options

```js
client.request('ListProjects', params, options)
```

```js
options = {
  timeout: 3000, // default 3000 ms
  formatAction: true, // default true, format the action to Action
  formatParams: true, // default true, format the parameter name to first letter upper case
  method: 'GET', // set the http method, default is GET
  headers: {}, // set the http request headers
}
```

For more details, see [@alicloud/pop-core](https://github.com/aliyun/openapi-core-nodejs-sdk)


And the [API Document](https://help.aliyun.com/document_detail/63881.html)



## License

[MIT](LICENSE)
