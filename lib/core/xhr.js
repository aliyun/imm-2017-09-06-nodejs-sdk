//var parseXMLString = require('xml2js').parseString;

module.exports =  {
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
};



/**
* @param opt  {Object}
* @param opt.method  {String}  [GET|HEAD|POST|PUT|PATCH|DELETE|OPTIONS]
* @param opt.url  {String}
* @param opt.headers  {Object} It's a map, such as: {'Content-Type':'application/json'}
* @param opt.isAsync  {Boolean}
* @param opt.data  {Object|String}
* @param opt.timeout {Integer} ms
* @return promise {Promise}
*/
function request(opt){
  var tid;

  return new Promise((a,b)=>{
    try{
      opt= Object.assign({
        method: 'GET',
        url: '/',
        data: null,
        headers: null,
        timeout: null,

        isAsync: true
      },opt);

      opt.method = opt.method.toUpperCase();

      var xhr = new XMLHttpRequest();

      if(opt.data!=null){
        if(['GET','HEAD','DELETE','OPTIONS'].indexOf(opt.method)!=-1 && opt.data!=null){

          if(typeof(opt.data)=='object'){
            opt.url += (opt.url.indexOf('?')!=-1?'&':'?') + getParams(opt.data)
          }else{
            opt.url += opt.data.toString();
          }
        }
        else{
          if(opt.headers['Content-Type'].indexOf('application/x-www-form-urlencoded')==0){
            opt.data = getParams(opt.data);
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

      xhr.open(opt.method, opt.url, opt.isAsync);

      if(opt.headers){
        for(var k in opt.headers){
          xhr.setRequestHeader(k, opt.headers[k]);
        }
      }

      if(opt.timeout){
        tid = setTimeout(function(){
          if(xhr) try{xhr.abort()}catch(e){};
        }, opt.timeout);
      }

      xhr.onreadystatechange = function(e){
        if(xhr.readyState==4){
          if(tid)clearTimeout(tid)

          var headers = parseHeaders(xhr.getAllResponseHeaders());
          var status =  xhr.status;
          let contentType = headers['content-type'];


          parseBody(contentType, xhr, function(data){
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



        }
      }
      xhr.send(opt.data);
    }catch(e){
      b(e);
    }
  });

}

function parseBody(contentType, xhr, fn){
  // if(contentType.indexOf('application/xml')==0 || contentType.indexOf('text/xml')==0){
  //   parseXMLString(xhr.responseText,
  //      {explicitArray:false},
  //      function (err, result) {
  //
  //     if(err)console.error(err);
  //     fn(result)
  //   });
  // }else
  if(contentType.indexOf('application/json')==0 || contentType.indexOf('text/json')==0){
    fn(JSON.parse(xhr.responseText))
  }else{
    fn(xhr.responseText)
  }

}

function getParams(data){
  var t=[];
  for(var k in data){
    t.push(k+'='+encodeURIComponent(data[k]));
  }
  return t.join('&')
}
function parseHeaders(s){
  var arr = s.trim().split('\n')
  var m={};
  for(var n of arr){
    var ind = n.indexOf(':');
    var k = n.substring(0,ind).toLowerCase();
    var v = ind!=-1? n.substring(ind+1).trim(): '';
    m[k]=v;
  }
  return m;
}
