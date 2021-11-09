const UpdateUserLastWrongPasswordDate = async(user) => {

    user.passwordLastTried = await Date.now();
    user.save()
}

module.exports = {
    UpdateUserLastWrongPasswordDate
}