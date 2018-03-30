
const POPRPC = require('../core/POPRPC.js');

const URI = '/';

class IMM extends POPRPC {
  doAction(opt){
    return this.req(URI, opt);
  }
}
const ACTIONS = [
  //projects
  'PutProject',
  'GetProject',
  'DeleteProject',
  'ListProjects',

  //office convert engine
  "ConvertOfficeFormat",
  "GetConvertOfficeFormatTask",
  "DeleteConvertOfficeFormatTask",
  "ListConvertOfficeFormatTasks",

  //大图切割
  'PhotoProcess',
  'GetPhotoProcessTask',
  'DeletePhotoProcessTask',
  'ListPhotoProcessTasks',

  //检测
  'DetectTag',
  'DetectFace',

  //tag group indexer
  'CreateTagSet',
  'GetTagSet',
  'DeleteTagSet',
  'ListTagSets',
  'IndexTag',
  'ListTagName',
  'GetTagPhotos',
  //'RemoveTagByName',
  'RemoveTagByUrl',

  'ListTagJobs',
  'GetTagJob',
  'CreateTagJob',
  'DeleteTagJob',

  //face group indexer
  'CreateFaceSet',
  'GetFaceSet',
  'DeleteFaceSet',
  'ListFaceSets',
  'IndexFace',
  'GroupFaces',
  'GetFaceSetDetail',
  'RemoveFaceByUrl',

  'CreateFaceJob',
  'GetFaceJob',
  'DeleteFaceJob',
  'ListFaceJobs',

  //鉴黄
  'ListPornBatchDetectJobs',
  'GetPornBatchDetectJob',
  'CreatePornBatchDetectJob',
  'DeletePornBatchDetectJob',
];


ACTIONS.forEach(n=>{
  IMM.prototype[n]=function(opt){
    return this.doAction(Object.assign({Action:n},opt))
  }
});

module.exports = IMM;
