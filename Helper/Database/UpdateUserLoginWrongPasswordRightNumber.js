const expressAsyncHandler = require("express-async-handler")

const UpdateUserWrongPasswordRight = expressAsyncHandler(async(user,wrongPasswordRight) => { 
    user.wrongPasswordRight = wrongPasswordRight - 1;
})

module.exports = {
    UpdateUserWrongPasswordRight
}