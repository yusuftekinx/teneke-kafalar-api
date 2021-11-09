const jwt = require('jsonwebtoken');
const { CustomErr } = require('../Error/CustomError');

const tokenControl = async(req,res,next) => {
    const {access_token} = req.headers;
    if(!access_token){
        return next(new CustomErr("Token bulunamadı.Lütfen giriş yapın",404))
    }
    const token = await access_token.split(' ')[1]
    const {JWT_SECRET_KEY} = process.env;
    jwt.verify(token,JWT_SECRET_KEY,(err,decoded) => {
        if(err){
            return next(new CustomErr("Token'ın süresi bitmiş ya da geçersiz.Lütfen tekrar giriş yapın.",401));
        }
        req.user = decoded;
        next();
    })

}

module.exports = {
    tokenControl
}