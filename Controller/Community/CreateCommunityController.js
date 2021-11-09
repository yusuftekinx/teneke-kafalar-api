const expressAsyncHandler = require("express-async-handler");
const { CustomErr } = require("../../Helper/Error/CustomError");
const Community = require('../../Models/CommunitySchema')

let createCommunityController = expressAsyncHandler(async(req,res,next) => {

    const {communityName,communityContent,owner,ownerEmail} = req.body;
    console.log(owner,ownerEmail)
    const community = await Community.create({
        communityName,
        communityContent,
        owner,
        ownerEmail
    })


    if(!community){
        return next(new CustomErr('Bir hata sebebiyle topluluğunuz oluşturulamadı',500));
    }


    res.json({
        success:true,
        message:'Topluluğunuz Oluşturuldu',
        community:community
    })
})

module.exports = {
    createCommunityController
}