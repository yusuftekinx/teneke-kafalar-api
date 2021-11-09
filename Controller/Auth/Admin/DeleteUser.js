const expressAsyncHandler = require("express-async-handler");
const { CustomErr } = require("../../../Helper/Error/CustomError");
const UserSchema = require("../../../Models/UserSchema");


const deleteUserByAdmin = expressAsyncHandler(async(req,res,next) => {

    const {id} = req.params;

    const user = await UserSchema.findById(id)

    if(!user){
        return next(new CustomErr('Kullanıcı bulunamadı',404))
    }
    user.delete();
    res.status(200).json({
        success:true,
        message:'Kullanıcı Silindi'
    })

})

module.exports = {
    deleteUserByAdmin
}