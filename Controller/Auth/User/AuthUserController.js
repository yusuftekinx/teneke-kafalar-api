const User = require('../../../Models/UserSchema')
const expressAsyncHandler = require('express-async-handler')
const { CustomErr } = require('../../../Helper/Error/CustomError');
const { passwordControl } = require('../../../Helper/PasswordControl/PasswordControl');
const { UpdateUserWrongPasswordRight } = require('../../../Helper/Database/UpdateUserLoginWrongPasswordRightNumber');
const { UpdateUserLastWrongPasswordDate } = require('../../../Helper/Database/UpdateUserLastWrongPasswordDate');
const {UpdateUserWrongPasswordRight5} = require('../../../Helper/Database/UpdateUserWrongPasswordRight5');
const { timeDifferenceControl } = require('../../../Helper/Database/TimeDifferenceControl');
const { createToken } = require('../../../Helper/Token/CreateJWToken');

const Login = expressAsyncHandler(async(req,res,next) => {

    const {username,password} = req.body;

    if(!username || !password){
        return next(new CustomErr("Kullanıcı adı ve parola belirtilmesi zorunlu alanlardır.",400))
    }


    const userFind = await User.findOne({username}).select("+password");
    if(!userFind){
        return next(new CustomErr("Kullanıcı Bulunamadı",404))
    }
    if(userFind.wrongPasswordRight === 0){
        const result = await timeDifferenceControl(userFind.passwordLastTried);
        if(result.minutes > 5) {
            await UpdateUserWrongPasswordRight5(userFind)
        }
        return next(new CustomErr("Çok fazla hatalı giriş yaptınız.Lütfen tekrar giriş yapmadan önce bekleyin.",429))
    }

    const passControl = await passwordControl(password,userFind.password);
    if(passControl === false){
        await UpdateUserWrongPasswordRight(userFind,userFind.wrongPasswordRight)
        await UpdateUserLastWrongPasswordDate(userFind)
        return next(new CustomErr("Girdiğiniz şifre hatalı.Lütfen kontrol edin.",400))
    }


    const token = await createToken(userFind.username,userFind.email,userFind.role);
    const user = {
        username:userFind.username,
        email:userFind.email,
        role:userFind.role
    }
    
    res.status(200).json({
        success:true,
        token:token,
        user
    })
})


const Register = expressAsyncHandler(async(req,res) => {

    const {username,email,password} = req.body;

    const user = await User.create({
        username,
        email,
        password
    })

    res.status(201).json({
        'success':true,
        'message':'Hesabınız Oluşturuldu.'
    })
})
module.exports = {
    Login,
    Register
}