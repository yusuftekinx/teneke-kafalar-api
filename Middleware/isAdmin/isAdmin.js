const { CustomErr } = require("../../Helper/Error/CustomError");

const isAdmin = (req,res,next) => {

    const {role} = req.user;
    if(role !== 'admin'){
        return next(new CustomErr('Bu sayfa için erişim izniniz yok.Lütfen erişim izni isteyin.',403))
    }

    next();

}

module.exports = {
    isAdmin
}