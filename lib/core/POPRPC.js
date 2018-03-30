const BaseClient = require('./BaseClient')
const uuidv4 = require('uuid/v4');
const crypto = require('crypto');
var XHR = isBrowser() ? require('./xhr.js') : require('./http.js');

class POPRPC extends BaseClient{
  req(uri, data) {
    data = signData(this.authInfo, 'POST', uri, data);

    return new Promise((a, b) => {
      request(this.authInfo, uri, data).then((result) => {
        // console.log(`%c[${data.Action}]`,'color:white;background:green'
        // ,JSON.stringify(data), JSON.stringify(result))
        a(result)
      }, (err) => {
        // console.log(`%c[${data.Action}]`,'color:white;background:red'
        // ,JSON.stringify(data), JSON.stringify(err.data))
        b(err)
      });
    })
  }
}

module.exports = POPRPC;

function isBrowser(){
  return (typeof(window)=='object' && typeof(navigator)=='object')
}

function request(authInfo, uri, data) {
  var url = authInfo.endpoint.replace(/\/$/, '') + uri;
  if(isBrowser() && data.Action) url+='?Action='+data.Action;
  var xhr= XHR.post(url, data, {headers:{'Content-Type':'application/x-www-form-urlencoded'}});
  if(data.ignoreError) xhr.ignoreError = data.ignoreError;
  return xhr;
}

function signData(authInfo, method, uri, data) {

  var timeStamp = new Date().toISOString();
  data = Object.assign({
    "AccessKeyId": authInfo.accessKeyId,
    "SignatureMethod": "HMAC-SHA1",
    "SignatureVersion": "1.0",
    "Timestamp": timeStamp,
    "Format": "JSON", // JSON, XML
    "Version": authInfo.apiVersion,
    "SignatureNonce": uuidv4()
  }, data);

  var t = [];
  t.push(method);
  t.push(encodeURL(uri));
  t.push(encodeURL(getQstr(data)));
  var str = t.join('&');
  data.Signature = hmac_sha1_base64(str, authInfo.accessKeySecret + '&');
  return data;
}

function hmac_sha1_base64(str, key) {
  var hmac = crypto.createHmac('sha1', key);
  return hmac.update(str).digest('base64');
}

function getQstr(data) {
  var t = [];
  for (var k in data) {
    t.push(encodeURL(k) + '=' + encodeURL(data[k] || ''))
  }
  t.sort();
  return t.join('&');
}


function encodeURL(s){
  s = encodeURIComponent(s)
  s = s.replace('(',escape('('))
  s = s.replace(')',escape(')'))
  return s;
}
