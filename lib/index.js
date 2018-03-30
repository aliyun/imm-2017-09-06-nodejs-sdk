
var IMM = require('./apis/imm');
module.exports = IMM;

if(typeof(window)=='object' && typeof(navigator)=='object'){
  window.IMM=IMM;
}
