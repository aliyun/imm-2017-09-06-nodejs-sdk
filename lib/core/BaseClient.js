
var requiredFields = ['accessKeyId','accessKeySecret','endpoint','apiVersion']

class BaseClient {
  /**
  * @param opt {Object} required
  * @param opt.accessKeyId {String} required
  * @param opt.accessKeySecret {String} required
  * @param opt.endpoint {String}  required
  * @param opt.apiVersion {String}  required

  * @param opt.httpOptions {Object}  optional
  * @param opt.httpOptions.timeout {Integer} optional unit: ms
  * @param opt.httpOptions.headers {Object} optional extenal headers
  */
  constructor(opt) {
    if(!opt){
      throw new Error('Invalid arguments')
    }
    for(var k of requiredFields){
      if(!opt[k]){
        throw new Error(k +' is required')
      }
    }
    this.authInfo = opt;
  }
}

module.exports = BaseClient
