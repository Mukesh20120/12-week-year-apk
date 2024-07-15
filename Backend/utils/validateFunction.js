const { default: mongoose } = require("mongoose")

const isValidObjectId = (id)=>{
    if(!id || !mongoose.isValidObjectId(id))
         return false;
return true;
}

module.exports = {isValidObjectId};