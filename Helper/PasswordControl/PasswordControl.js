
const bcryptjs = require('bcryptjs')

const passwordControl = async(password,userPassword) => {
    const control = await bcryptjs.compare(password,userPassword);
    return control;    
}

module.exports = {
    passwordControl
}