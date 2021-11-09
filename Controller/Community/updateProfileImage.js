const expressAsyncHandler = require("express-async-handler");
const CommunitySchema = require("../../Models/CommunitySchema");


let updateProfileImage = expressAsyncHandler(async(req,res,next) => {

    const {id} = req.params;

    const community = await CommunitySchema.findOne({_id:id})
    community.communityProfileImage = req.savedProfileImage;
    community.save();
    // profile resmi güncelleme sorunu var!
    req.communityId = null;
    req.savedProfileImage = null;
    

    res.status(200).json({
        success:true,
        message:'Profil resmi güncellendi.'
    })

}
)
module.exports = {
    updateProfileImage
}