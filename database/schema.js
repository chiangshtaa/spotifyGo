const Realm = require('realm');
class RunLog {}
RunLog.schema = {
  name: 'RunLog',
  properties: {
    username: 'string',
    time: 'int',
    course: 'string',
  }
};

let runLog = new Realm({schema: [RunLog]});

module.exports = runLog;
