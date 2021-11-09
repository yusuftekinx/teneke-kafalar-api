
const mongoose = require('mongoose')
const { Schema } = mongoose;
const slug = require('slug')
const CommunitySchema = new Schema({
    communityName:{
        type:String,
        required:[true,"Topluluk adı zorunludur."],
        minlength:[3,"Topluluk adı en az 3 karakter olmalıdır."],
        maxlength:[24,"Topluluk adı en fazla 24 karakter olmalıdır."],
    },
    owner:{
        type:String,
        required:[true]
    },
    ownerEmail:{
        type:String,
        required:true
    },
    communityProfileImage:{
        type:String,
        default:'default.png'
    },
    createdDate:{
        type:Date,
        default: Date.now()
    },
    communityContent:{
        type:String,
        maxlength:[500,"Topluluk açıklaması en fazla 500 karakter olabilir."]
    },
    members:{
        type:Array,
        default:[]
    },
    slugName:{
        type:String
    }
})


CommunitySchema.pre("save",function(next){
    this.slugName = slug(this.communityName);

    next()
})

module.exports = mongoose.model('Community',CommunitySchema);
