const { CustomErr } = require("../../Helper/Error/CustomError")


const CustomErrorHandler = (err, req, res, next) => {

    let customErr = err;
    if (customErr.name === "ValidationError") {
        const message = customErr.errors.email?.message || customErr.errors.username?.message || customErr.errors.password?.message
        customErr = new CustomErr(message, 400);
    }

    if (customErr.code === 11000) {
        customErr = new CustomErr("E-Posta adresi başka bir kullanıcı tarafından kullanılıyor", 400)
    }
    res.status(customErr.code || 500).json({
        success: false,
        message: customErr.message
    })

    next();
}

module.exports = {
    CustomErrorHandler
}