const expressAsyncHandler = require("express-async-handler");
const CommunitySchema = require("../../Models/CommunitySchema");
const { CustomErr } = require("../Error/CustomError");



const isCommmunity = expressAsyncHandler(async(req,res,next)=>{

    const {id} = req.params;

    const community = await CommunitySchema.findOne({id});
    
    if(!community){
        return next(new CustomErr("Topluluk bulunamadı."))
    }

    req.communityId = await community.id;

    next();
})

module.exports = {
    isCommmunity
}