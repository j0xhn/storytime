const codes = require('../config/httpCodes');
const ResponseUtil = {};

function checkIfObject(variable){
  variable !== null && typeof variable === 'object'
}

ResponseUtil.success = function(req, res, data){
  if (data && checkIfObject(data)){
    console.error('response with different type than object provided, unexpected results may occur')
  }
  res.status(codes.success).send(data);
};

ResponseUtil.error = function(req, res, data){
  if (data && checkIfObject(data)){
    console.error('response with different type than object provided, unexpected results may occur')
  }
  res.status(codes.error).send(data);
};
module.exports = ResponseUtil;
