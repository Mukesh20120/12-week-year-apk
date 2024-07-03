const notFoundMiddleware = (req,res)=>{
    res.json({status: false,message: 'Page not found! Wrong URL'});
}

module.exports = {notFoundMiddleware}