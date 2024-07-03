const errorHandlerMiddleware = (err,req,res,next) => {
   let customError = {
    statusCode: err.statusCode || 500,
    message: err.message || 'something went wrong try again later'
   }
   if(err.name === 'ValidationError'){
    customError.message = Object.values(err.errors).map(item=>item.message).join(',');
    customError.statusCode = 400
   }
   if(err.code && err.code === 11000){
    customError.message = `Duplicate value entered for ${Object.keys(err.keyValue)} field, Please choose other value`;
    customError.statusCode = 400
   }
   if(err.name === 'CastError'){
    customError.message = `No item found ${err.value}`
    customError.statusCode = 404
   }

   return res.status(customError.statusCode).json({status: false,message: customError.message});
}

module.exports = {errorHandlerMiddleware};