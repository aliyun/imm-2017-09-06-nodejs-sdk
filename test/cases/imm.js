const BUCKET = 'luogc-shenzhen'

function getClient(){
  return new RPCClient({
    endpoint:'http://imm.cn-shanghai.aliyuncs.com',
    accessKeyId: Config.id,
    accessKeySecret: Config.secret,
    apiVersion: '2017-09-06'
  })
  
}


describe('imm', function(){
  this.timeout(10000)
  it('#ListProjects', async ()=>{
    var client = getClient();
    var result = await client.request('ListProjects');
    console.log(result)
    result.should.have.property('Projects')
  })
})
