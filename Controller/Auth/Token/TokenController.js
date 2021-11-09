

const TokenController = (req,res,next) => {


    const {email,username,role} = req.user;

    let user= {
        email,
        username,
        role
    }

    res.json({
        success:true,
        user
    })

}


module.exports = {
    TokenController
}