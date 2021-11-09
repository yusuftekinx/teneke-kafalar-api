const expressAsyncHandler = require("express-async-handler");


const HomeController = expressAsyncHandler(async(req,res,next) => {
    res.status(200).json({
        success:true,
        message:"Welcome to home page"
    })
})

module.exports = {
    HomeController
}