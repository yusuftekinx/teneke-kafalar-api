
const mongoose = require('mongoose')
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    username:{
        type:String,
        required:[true,"Kullanıcı adı zorunludur."],
        minlength:[3,"Kullanıcı adı en az 3 karakter olmalıdır."],
        maxlength:[24,"Kullanıcı adı en fazla 24 karakter olmalıdır."],
    },
    email:{
        type:String,
        required:[true,"E-Posta adresi zorunludur."],
        unique:[true,"Belirtilen e-posta adresi başka kullanıcı tarafından kullanılıyor."],
        match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,"Lütfen geçerli e-posta adresi belirtin."]

    },
    password:{
        type:String,
        required:[true,"Şifre zorunludur."],
        minlength:[6,"Şifreniz en az 6 karakter olmalıdır."],
        select:false

    },
    role:{
        type:String,
        default:'user',
        enum:["user","moderatör","admin"]
    },
    wrongPasswordRight:{
        type:Number,
        default:5
    },
    joined_date:{
        type:Date,
        default: Date.now()
    },
    passwordLastTried:{
        type:Date,
    }
})


UserSchema.pre("save",function(next){

    if(!this.isModified("password")){
        next(); // Parola Değişmemişse tekrardan hhashleme yapmamasını istiyoruz
    }
    bcrypt.genSalt(10, (err, salt) => {
        if(err) next(err);
        bcrypt.hash(this.password, salt,(err, hash) =>  {
            if(err) next(err);
            this.password = hash;
            next();
        });
    });
})

module.exports = mongoose.model('User',UserSchema);
