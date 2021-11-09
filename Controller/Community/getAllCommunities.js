const expressAsyncHandler = require("express-async-handler")
const Community = require("../../Models/CommunitySchema")



const getAllCommunities = expressAsyncHandler(async(req,res,next) => {


    const communities = await Community.find();
    res.status(200).json({
        success:true,
        allCommunities:communities
    })
})

module.exports = {
    getAllCommunities
}