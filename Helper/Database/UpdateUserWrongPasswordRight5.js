

const UpdateUserWrongPasswordRight5 = (user) => {
    user.wrongPasswordRight = 5
    user.save();
}

module.exports = {
    UpdateUserWrongPasswordRight5
}