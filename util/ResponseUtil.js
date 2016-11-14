const ResponseUtil = {};

function checkIfObject(variable){
  variable !== null && typeof variable === 'object'
}

ResponseUtil.success = function(req, res, data){
  debugger;
  if (data && checkIfObject(data)){
    console.error('response with different type than object provided, unexpected results may occur')
  }
  res.send({success: true, payload:data});
};

ResponseUtil.error = function(req, res, data){
  debugger;
  if (data && checkIfObject(data)){
    console.error('response with different type than object provided, unexpected results may occur')
  }
  res.send({error: true, payload:data});
};
module.exports = ResponseUtil;
