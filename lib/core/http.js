var http = require('http');
var https = require('https');
var querystring = require('querystring');
var parseURL = require('url').parse;
//var parseXMLString = require('xml2js').parseString;

module.exports = {
  request: request,
  get: function(url, data, opt){
    return request(Object.assign({method:'GET', url, data}, opt))
  },
  post: function(url, data, opt){
    return request(Object.assign({method:'POST', url, data}, opt))
  },
  head: function(url, data, opt){
    return request(Object.assign({method:'HEAD', url, data}, opt))
  },
  put: function(url, data, opt){
    return request(Object.assign({method:'PUT', url, data}, opt))
  },
  delete: function(url, data, opt){
    return request(Object.assign({method:'DELETE', url, data}, opt))
  },
  patch: function(url, data, opt){
    return request(Object.assign({method:'PATCH', url, data}, opt))
  },
  options: function(url, data, opt){
    return request(Object.assign({method:'options', url, data}, opt))
  }
}


function request(opt){

  return new Promise((a,b)=>{
    try{
      opt= Object.assign({
        method: 'GET',
        url: '/',
        data: null,
        headers: null,
        timeout: null,
      }, opt);

      opt.method = opt.method.toUpperCase();

      opt = Object.assign(opt, parseURL(opt.url, true));

      var client =http;

      if(opt.protocol=='https:'){
        client= https;
        opt.port=opt.port||'443';
        opt.rejectUnauthorized=false;
      }


      if(opt.data!=null){
        if(['GET','HEAD','DELETE','OPTIONS'].indexOf(opt.method)!=-1 ){
          if(typeof(opt.data)=='object'){
            opt.path += (opt.url.indexOf('?')!=-1?'&':'?') + querystring.stringify(opt.data)
          }else{
            opt.path += opt.data.toString();
          }
        }
        else{
          if(opt.headers['Content-Type'].indexOf('application/x-www-form-urlencoded')==0){
            opt.data = querystring.stringify(opt.data);
          }
          else if(opt.headers['Content-Type'].indexOf('application/json')==0
          || opt.headers['Content-Type'].indexOf('text/json')==0
          || opt.headers['Content-Type'].indexOf('text/plain')==0){
            if(typeof(opt.data)=='object'){
              opt.data = JSON.stringify(opt.data)
            }
          }
        }
      }



      var reqData = opt.data;
      if(!opt.data){
        reqData = null;
        opt.headers['content-length']==0;
      }
      else if(typeof(opt.data)=='object'){
        reqData = JSON.stringify(opt.data);
        opt.headers['content-length']==Buffer.byteLength(reqData);
      }
      else {
        reqData = opt.data+'';
        opt.headers['content-length']==Buffer.byteLength(reqData);
      }


      delete opt.data;
      delete opt.url;
      // console.log('--1----\n',opt,'\n--------');
      // console.log('--2----\n',reqData,'\n--------');

      var req = client.request(opt, (res)=>{

        var contentType = res.headers['content-type'];
        var status = res.statusCode;
        var headers = res.headers;

        //console.log(res.statusCode)

        var buf = Buffer.from([]);
        res.on('data', function(chunk){
          buf = Buffer.concat([buf, chunk], buf.length+chunk.length)
        });
        res.on('end', function(){
          parseBody(contentType, buf, function(data){
            if(status>=200 && status<400){
              a({
                status,
                headers,
                data
              });
            }else{
              b({
                status,
                headers,
                data
              });
            }
          });

        });

      });

      if(opt.timeout) req.setTimeout(opt.timeout);

      req.end(reqData);

    }catch(e){
      console.error(e)
      b(e)
    }
  })
}


function parseBody(contentType, buf, fn){
  // if(contentType.indexOf('application/xml')==0 || contentType.indexOf('text/xml')==0){
  //   parseXMLString(buf.toString(),
  //    {explicitArray:false},
  //    function (err, result) {
  //     if(err)console.error(err);
  //     fn(result)
  //   });
  // }
  // else
  if(contentType.indexOf('application/json')==0 || contentType.indexOf('text/json')==0){
    data = JSON.parse(buf.toString())
    fn(data);
  }else if(contentType.indexOf('text/')==0){
    data = buf.toString()
    fn(data)
  }
}
