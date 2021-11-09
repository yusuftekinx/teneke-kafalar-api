const expressAsyncHandler = require('express-async-handler');
const Community = require('../../Models/CommunitySchema');

const deleteCommunityController = expressAsyncHandler(async(req,res,next) => {
    const {id} = req.params;
    console.log(id)
    //await Community.deleteOne({id});

    const community = await Community.findById(id);
    community.delete();

    res.status(200).json({
        success:true,
        message:'Topluluk kalıcı olarak silindi.'
    })

})
module.exports = {deleteCommunityController}