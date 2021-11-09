const mongoose = require('mongoose')


const URI = process.env.MONGO_URI;
const ConnectDatabase = () => {

    mongoose.connect(URI).then(result => {
        console.log('Database Connection Success');
    }).catch(err => {
        console.log(err)
    })


}

module.exports = {
    ConnectDatabase
}