
module.exports={
  errorHandler:function(result, errorCode, errorMessage, error) {
    result.status(errorCode).json({
         result: errorMessage
    });
    console.log(errorMessage);
    console.log(error);
  }
}
