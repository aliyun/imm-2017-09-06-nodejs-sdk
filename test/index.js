global.RPCClient = require('@alicloud/pop-core').RPCClient;
require('mocha')
require('should')

const path = require('path')
const os = require('os')
global.Config = require(path.join(os.homedir(),'.ak.json'))

//cases
require('./cases/imm.js')
